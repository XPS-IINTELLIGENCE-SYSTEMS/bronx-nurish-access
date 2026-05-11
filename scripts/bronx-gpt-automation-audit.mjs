import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const root = process.cwd();
const outDir = path.join(root, 'autobuild-artifacts');
fs.mkdirSync(outDir, { recursive: true });

const unsafePatterns = [
  /live[-_]?post/i,
  /publish[-_]?live/i,
  /auto[-_]?comment/i,
  /auto[-_]?send/i,
  /spend[-_]?credits/i,
  /merge[-_]?auto/i,
  /facebook\/post/i,
  /buffer\/post/i,
  /shopify\/publish/i
];

const blockedClaims = [
  /3\s*meals\s*\/\s*day/i,
  /three\s+meals\s+(a|per)\s+day/i,
  /federal[-\s]?paid/i,
  /government\s+approved/i,
  /official\s+government\s+program/i,
  /guaranteed\s+approval/i,
  /guaranteed\s+benefits/i,
  /84\s+days/i,
  /90\s+days/i,
  /free\s+groceries\s+guaranteed/i,
  /everyone\s+qualifies/i
];

const ignoredDirs = new Set(['.git', '.next', 'node_modules', 'autobuild-artifacts']);
const allowedExtensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.md', '.json', '.yml', '.yaml']);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (allowedExtensions.has(path.extname(entry.name))) files.push(full);
  }
  return files;
}

function rel(file) {
  return path.relative(root, file).replaceAll('\\\\', '/');
}

function scanFiles(patterns) {
  const findings = [];
  for (const file of walk(root)) {
    const text = fs.readFileSync(file, 'utf8');
    const lines = text.split(/\r?\n/);
    lines.forEach((line, index) => {
      for (const pattern of patterns) {
        if (pattern.test(line)) findings.push({ file: rel(file), line: index + 1, pattern: String(pattern), text: line.trim().slice(0, 220) });
      }
    });
  }
  return findings;
}

function tryCommand(command) {
  try {
    const output = execSync(command, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    return { ok: true, command, output: output.slice(-5000) };
  } catch (error) {
    return { ok: false, command, output: String(error.stdout || '').slice(-5000), error: String(error.stderr || error.message).slice(-5000) };
  }
}

const routeExpectations = [
  'app/admin/content/page.tsx',
  'app/admin/assets/page.tsx',
  'app/admin/video/page.tsx',
  'app/admin/images/page.tsx',
  'app/admin/chat/page.tsx',
  'app/admin/scheduler/page.tsx',
  'app/admin/proof/page.tsx',
  'app/admin/automation/page.tsx',
  'app/api/admin/content/status/route.ts',
  'app/api/admin/assets/status/route.ts',
  'app/api/admin/video/status/route.ts',
  'app/api/admin/images/status/route.ts',
  'app/api/admin/chat/status/route.ts',
  'app/api/admin/scheduler/status/route.ts',
  'app/api/admin/proof/status/route.ts',
  'app/api/admin/automation/status/route.ts'
];

const missingRoutes = routeExpectations.filter((p) => !fs.existsSync(path.join(root, p)));
const unsafeFindings = scanFiles(unsafePatterns);
const claimFindings = scanFiles(blockedClaims);
const build = process.env.SKIP_BUILD === 'true' ? { ok: true, skipped: true } : tryCommand('npm run build');

const launchChecks = {
  build_ready: build.ok,
  admin_routes_present: missingRoutes.length === 0,
  unsafe_patterns_clean: unsafeFindings.length === 0,
  blocked_claims_clean: claimFindings.length === 0,
  has_pr7_validation_workflow: fs.existsSync(path.join(root, '.github/workflows/bronx-pr7-recursive-validation.yml')),
  has_bridge_workflow: fs.existsSync(path.join(root, '.github/workflows/bronx-gpt-automation-bridge.yml')),
  has_content_command_docs: fs.existsSync(path.join(root, 'docs/GPT_AUTOMATION_BRIDGE_OS.md')),
  has_admin_secret_reference: walk(root).some((file) => fs.readFileSync(file, 'utf8').includes('ADMIN_SECRET')),
  has_no_known_live_post_routes: !walk(path.join(root, 'app')).some((file) => rel(file).match(/facebook\/post|buffer\/post|auto-comment|publish-live/i)),
  manual_launch_approval: false
};

const score = Object.values(launchChecks).filter(Boolean).length;
const total = Object.keys(launchChecks).length;

const report = {
  ok: build.ok && missingRoutes.length === 0 && unsafeFindings.length === 0,
  generatedAt: new Date().toISOString(),
  branch: process.env.GITHUB_REF_NAME || 'local',
  commit: process.env.GITHUB_SHA || 'local',
  project: 'Bronx Nourish Access',
  mode: 'draft_export_review_only',
  build,
  missingRoutes,
  unsafeFindings,
  claimFindings,
  launchChecks,
  launchScore: { score, total },
  nextActions: [
    'Fix build/type errors until Vercel preview is READY.',
    'Complete missing PR #8 queue APIs if absent.',
    'Consolidate duplicate Content Command DB helpers.',
    'Seed Drive source index into the app database.',
    'Assign approved public asset URLs for scheduler exports.',
    'Run privacy/legal/manual claim review before launch.'
  ]
};

const md = `# Bronx GPT Automation Bridge Audit\n\nGenerated: ${report.generatedAt}\n\nMode: ${report.mode}\n\n## Result\n\n- OK: ${report.ok}\n- Launch score: ${score}/${total}\n- Build: ${build.ok ? 'PASS' : 'FAIL'}\n- Missing routes: ${missingRoutes.length}\n- Unsafe findings: ${unsafeFindings.length}\n- Blocked claim findings: ${claimFindings.length}\n\n## Missing routes\n\n${missingRoutes.length ? missingRoutes.map((item) => `- ${item}`).join('\n') : 'None'}\n\n## Unsafe findings\n\n${unsafeFindings.length ? unsafeFindings.map((f) => `- ${f.file}:${f.line} — ${f.text}`).join('\n') : 'None'}\n\n## Blocked claim findings\n\n${claimFindings.length ? claimFindings.slice(0, 50).map((f) => `- ${f.file}:${f.line} — ${f.text}`).join('\n') : 'None'}\n\n## Next actions\n\n${report.nextActions.map((item) => `- ${item}`).join('\n')}\n`;

fs.writeFileSync(path.join(outDir, 'autobuild-audit.json'), JSON.stringify(report, null, 2));
fs.writeFileSync(path.join(outDir, 'autobuild-report.md'), md);
fs.writeFileSync(path.join(outDir, 'unsafe-patterns.json'), JSON.stringify(unsafeFindings, null, 2));
fs.writeFileSync(path.join(outDir, 'claim-scan.json'), JSON.stringify(claimFindings, null, 2));
fs.writeFileSync(path.join(outDir, 'next-actions.md'), report.nextActions.map((item) => `- ${item}`).join('\n'));

console.log(md);
if (!report.ok && process.env.ALLOW_AUDIT_FAILURE !== 'true') process.exit(1);
