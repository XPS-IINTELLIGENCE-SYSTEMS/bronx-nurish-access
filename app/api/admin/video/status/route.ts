import { NextRequest } from "next/server";
import { moduleStatus } from "@/lib/content-command/api";

export async function GET(req: NextRequest) {
  return moduleStatus(req, "video");
}
