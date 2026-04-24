import bcrypt from "bcryptjs";
import { getPrismaClient } from "@/backend/lib/prisma";

export type LoginResult = {
  ok: boolean;
  message: string;
  status: number;
};

export async function loginWithEmailPassword(
  email: string,
  password: string,
): Promise<LoginResult> {
  const prisma = getPrismaClient();

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      passwordHash: true,
    },
  });

  if (!user) {
    return {
      ok: false,
      message: "Invalid email or password.",
      status: 401,
    };
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    return {
      ok: false,
      message: "Invalid email or password.",
      status: 401,
    };
  }

  return {
    ok: true,
    message: "Login successful.",
    status: 200,
  };
}