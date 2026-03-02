import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.count();

    return NextResponse.json({
      ok: true,
      database: "connected",
      users,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const message =
      process.env.NODE_ENV === "development" && error instanceof Error
        ? error.message
        : "Falha ao consultar o banco.";

    return NextResponse.json(
      {
        ok: false,
        database: "unavailable",
        message,
      },
      { status: 500 },
    );
  }
}
