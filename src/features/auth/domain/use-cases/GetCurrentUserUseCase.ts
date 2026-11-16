import { AuthRepository } from "../repositories/AuthRepository";

export class GetCurrentUserUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(accessToken: string) {
    return this.authRepository.getCurrentUser(accessToken);
  }
}
