import "express";

import "express";
import { AuthenticatedUser } from "./types/authenticated-user";

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export {};
