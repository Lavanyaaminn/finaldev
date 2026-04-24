import { NextResponse } from "next/server";
import { getAdminSnapshot } from "@/backend/services/store";

export async function GET() {
  const snapshot = getAdminSnapshot();
  return NextResponse.json({ orders: snapshot.latestOrders });
}
