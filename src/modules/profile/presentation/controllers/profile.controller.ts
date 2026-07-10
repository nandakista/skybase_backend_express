import { NextFunction, Request, Response } from "express";

import { ResponseHelper } from "../../../../infrastructure/http/response/response.helper";
import { GetProfileService } from "../../application/services/get-profile.service";

export class ProfileController {
    constructor(private getProfileService: GetProfileService) { }

    profile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.getProfileService.execute(req.user!.id);
            return ResponseHelper.success(
                res,
                result,
                "Profile retrieved successfully"
            );
        } catch (error) {
            next(error);
        }
    };
}