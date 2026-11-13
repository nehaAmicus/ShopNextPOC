import { LoginCredentials, AuthTokens } from "../entities/LoginInterface";
import { User } from "../entities/User";

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<{
    user: User;
    tokens: AuthTokens;
  }>;

  getCurrentUser(accessToken: string): Promise<User>;

  refreshSession(refreshToken: string): Promise<AuthTokens>;
  logout(): Promise<void>;
}
