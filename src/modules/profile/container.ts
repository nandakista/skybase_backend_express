import { GetProfileService } from "./application/services/get-profile.service";
import { ProfileDataSourceImpl } from "./data/datasources/profile.datasource.impl";
import { ProfileRepositoryImpl } from "./data/repositories/profile.repository.impl";
import { ProfileController } from "./presentation/controllers/profile.controller";

const profileDataSource = new ProfileDataSourceImpl();
const profileRepo = new ProfileRepositoryImpl(profileDataSource);
const getProfileService = new GetProfileService(profileRepo);
export const profileController = new ProfileController(getProfileService);