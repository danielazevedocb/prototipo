import { NextResponse } from "next/server";

import { authenticateUser } from "@/lib/auth/authenticate";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      username?: unknown;
      password?: unknown;
      rememberMe?: unknown;
    };

    const result = await authenticateUser({
      username: body.username,
      password: body.password,
      rememberMe: body.rememberMe,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
        },
        { status: result.status },
      );
    }

    const response = NextResponse.json({
      success: true,
      redirectTo: "/dashboard",
      user: result.user,
    });

    response.cookies.set({
      name: "session",
      value: result.sessionToken,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: result.rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 8,
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Não foi possível processar o login.",
      },
      { status: 500 },
    );
  }
}
