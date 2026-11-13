import { LoginUseCase } from "../domain/use-cases/LoginUseCase";
import { GetCurrentUserUseCase } from "../domain/use-cases/GetCurrentUserUseCase";
import { RefreshSessionUseCase } from "../domain/use-cases/RefreshSessionUseCase";

import { AuthApiService } from "../data/services/AuthApiService";
import { AuthRepositoryImpl } from "../data/repositories/AuthRepositoryImpl";
import { LogoutUseCase } from "../domain/use-cases/LogoutUseCase";

// Create dependencies
const authApiService = new AuthApiService();
const authRepository = new AuthRepositoryImpl(authApiService);
// Create use cases
export const loginUseCase = new LoginUseCase(authRepository);
export const getCurrentUserUseCase = new GetCurrentUserUseCase(authRepository);
export const refreshSessionUseCase = new RefreshSessionUseCase(authRepository);
export const logoutUseCase = new LogoutUseCase(authRepository);
