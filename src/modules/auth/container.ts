import { LoginService } from "./application/services/login.service";
import { AuthDataSourceImpl } from "./data/datasources/auth.datasource.impl";
import { AuthRepositoryImpl } from "./data/repositories/auth.repository.impl";
import { LoginController } from "./presentation/controllers/login.controller";

const authDataSource = new AuthDataSourceImpl();
const authRepo = new AuthRepositoryImpl(authDataSource);
const loginUseCase = new LoginService(authRepo);

export const loginController = new LoginController(loginUseCase);