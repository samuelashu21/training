import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { signToken } from "@/lib/auth";
import { AUTH_COOKIE, authCookieOptions } from "@/lib/cookies";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body as { email?: string; password?: string };

  if (!email || !password) {
    return NextResponse.json({ error: "Missing email or password." }, { status: 400 });
  }

  await connectDB();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });

  const token = signToken({ sub: String(user._id), email: user.email, role: user.role });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE, token, authCookieOptions());
  return res;
}