import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { User } from "../../domain/entities/User";

import { AuthApiService } from "../services/AuthApiService";
import { LoginRequestDto } from "../dto/LoginRequestDto";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly api: AuthApiService) {}

  async login(credentials: LoginRequestDto) {
    const response = await this.api.login(credentials);

    const user: User = {
      id: response.id,
      username: response.username,
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
      image: response.image,
    };

    return {
      user,
      tokens: {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      },
    };
  }

  async getCurrentUser(accessToken: string): Promise<User> {
    const response = await this.api.getCurrentUser(accessToken);
    return {
      id: response.id,
      username: response.username,
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
      image: response.image,
    };
  }

  async refreshSession(refreshToken: string) {
    const response = await this.api.refreshSession(refreshToken);

    return {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    };
  }
  async logout(): Promise<void> {
    await this.api.logout();
  }
}
