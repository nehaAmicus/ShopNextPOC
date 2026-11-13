import { AuthRepository } from "../repositories/AuthRepository";

export class RefreshSessionUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(refreshToken: string) {
    return this.authRepository.refreshSession(refreshToken);
  }
}
