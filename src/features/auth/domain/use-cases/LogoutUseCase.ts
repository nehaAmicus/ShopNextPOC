import { AuthRepository } from "../repositories/AuthRepository";

export class LogoutUseCase {
  constructor(private readonly repository: AuthRepository) {}

  async execute(): Promise<void> {
    await this.repository.logout();
  }
}
