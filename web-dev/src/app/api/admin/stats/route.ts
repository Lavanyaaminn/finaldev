import { NextResponse } from "next/server";
import { getAdminSnapshot } from "@/backend/services/store";

export async function GET() {
  return NextResponse.json(getAdminSnapshot());
}
