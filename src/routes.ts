import { Router, Request, Response } from "express";
import authMiddleware from "./middlewares/auth";

import {
  get_all_users,
  get_user,
  create_user,
  delete_user,
} from "./controllers/admin/userController";

import {
  login,
  auth,
  guest,
} from "./controllers/admin/authController";

import {
  get_all_Surveys,
  get_Survey,
  create_Survey,
} from "./controllers/survey/surveyController";


const routes = Router();

routes.get("/", async (request: Request, response: Response) => {
  response.send("WellCome!");
});

routes
  .get("/api/users", get_all_users)
  .get("/api/users/:id", get_user)
  .post("/api/users", create_user)
  .delete("/api/users/:id", delete_user)

  .get("/api/surveys", get_all_Surveys)
  .get("/api/surveys/:id", get_Survey)
  .post("/api/surveys", create_Survey)


  .post("/api/auth/login", login)
  .get("/api/auth/guest", guest)
  .get("/api/auth/auth", authMiddleware, auth)
    
export default routes;
