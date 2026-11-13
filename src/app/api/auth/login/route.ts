import { loginUseCase } from "@/features/auth/di/server-container.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const username = body.username?.trim();
    const password = body.password;

    // Validate incoming request
    if (
      typeof username !== "string" ||
      !username ||
      typeof password !== "string" ||
      !password
    ) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 },
      );
    }

    // Execute business operation
    const result = await loginUseCase.execute({
      username,
      password,
    });

    const response = NextResponse.json({
      message: "Login successful",
      user: result.user,
    });

    // Store tokens in HTTP-only cookies
    response.cookies.set("accessToken", result.tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 60,
    });

    response.cookies.set("refreshToken", result.tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { message: "Login failed. Please check your credentials." },
      { status: 401 },
    );
  }
}
