import { NextResponse } from "next/server";
import { loginWithEmailPassword } from "@/backend/services/auth";

type LoginBody = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginBody;
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 },
      );
    }

    const result = await loginWithEmailPassword(email, password);

    return NextResponse.json(
      { message: result.message },
      { status: result.status },
    );
  } catch (error) {
    console.error("Login error", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 },
    );
  }
}