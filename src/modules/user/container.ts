import { GetUserDetailUseCase } from "./application/services/get-detail-user.service";
import { GetUsersService } from "./application/services/get-users.service";
import { UserDataSourceImpl } from "./data/datasources/user.datasource.impl";
import { UserRepositoryImpl } from "./data/repositories/user.repository.impl";
import { PermissionsController } from "./presentation/controllers/permissions.controller";
import { UserController } from "./presentation/controllers/user.controller";
import { UsersController } from "./presentation/controllers/users.controller";

const userDataSource = new UserDataSourceImpl();
const userRepository = new UserRepositoryImpl(userDataSource);

const userService = new GetUsersService(userRepository);
const getUserService = new GetUserDetailUseCase(userRepository);

export const usersController = new UsersController(userService);
export const userController = new UserController(getUserService);
export const permissionsController = new PermissionsController();