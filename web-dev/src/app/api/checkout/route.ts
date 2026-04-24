import { NextResponse } from "next/server";
import { createOrder, type CartItemInput, type CheckoutCustomer } from "@/backend/services/store";

type CheckoutBody = {
  customer?: CheckoutCustomer;
  items?: CartItemInput[];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutBody;
    const customer = body.customer;
    const items = body.items ?? [];

    if (!customer || !customer.fullName || !customer.email || !customer.address) {
      return NextResponse.json(
        { message: "Customer details are incomplete." },
        { status: 400 },
      );
    }

    const result = createOrder(items, customer);
    if (!result.ok) {
      return NextResponse.json({ message: result.message }, { status: result.status });
    }

    return NextResponse.json(
      {
        message: "Order placed successfully.",
        orderId: result.order.orderId,
        order: result.order,
      },
      { status: result.status },
    );
  } catch (error) {
    console.error("Checkout error", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 },
    );
  }
}
