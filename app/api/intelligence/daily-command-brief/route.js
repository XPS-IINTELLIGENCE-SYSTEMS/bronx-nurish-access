import { standardResponse } from '../../../../src/autobuild/runtime.js';
import { generateDailyCommandBrief } from '../../../../src/intelligence/dailyCommandBrief.js';
import { saveDailyCommandBrief } from '../../../../src/intelligence/dailyBriefStore.js';
import { logAudit } from '../../../../src/autobuild/storeLogs.js';

export async function GET() {
  const brief = await generateDailyCommandBrief();
  const persistence = await saveDailyCommandBrief(brief);
  await logAudit('intelligence.daily_command_brief.completed', 'DailyCommandBriefAgent', 'Daily command brief generated and stored.', { brief_id: brief.brief_id, persistence });
  return standardResponse({ brief, persistence }, {
    warnings: ['Daily brief is autonomous internal work. No public publishing, trading, or production mutation occurred.'],
    audit_event: {
      event_type: 'intelligence.daily_command_brief.completed',
      actor: 'DailyCommandBriefAgent',
      message: 'Daily command brief generated safely.'
    }
  });
}

export async function POST() {
  return GET();
}
