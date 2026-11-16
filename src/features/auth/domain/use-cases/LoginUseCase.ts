import { LoginCredentials } from "../entities/LoginInterface";
import { AuthRepository } from "../repositories/AuthRepository";

export class LoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(credentials: LoginCredentials) {
    return this.authRepository.login(credentials);
  }
}
