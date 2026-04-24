import { NextResponse } from "next/server";
import { getProductBySlug } from "@/backend/services/store";

type ProductRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function GET(_: Request, { params }: ProductRouteProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return NextResponse.json({ message: "Product not found." }, { status: 404 });
  }

  return NextResponse.json({ product });
}
