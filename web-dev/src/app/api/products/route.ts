import { NextResponse } from "next/server";
import { getShopMeta, searchProducts } from "@/backend/services/store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") ?? undefined;
  const category = searchParams.get("category") ?? undefined;

  const products = searchProducts(query, category);

  return NextResponse.json({
    products,
    meta: getShopMeta(),
  });
}
