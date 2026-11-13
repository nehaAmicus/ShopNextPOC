import { LoginRequestDto } from "../dto/LoginRequestDto";
import { AuthResponseDto } from "../dto/AuthResponseDto";

const BASE_URL = process.env.API_BASE_URL;

export class AuthApiService {
  async login(credentials: LoginRequestDto): Promise<AuthResponseDto> {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Invalid username or password");
    }

    return response.json();
  }

  async getCurrentUser(accessToken: string) {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Unable to fetch current user");
    }

    return response.json();
  }

  async refreshSession(refreshToken: string) {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken,
        expiresInMins: 30,
      }),
    });

    if (!response.ok) {
      throw new Error("Unable to refresh session");
    }

    return response.json();
  }
  async logout(): Promise<void> {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }
  }
}
