import express from "express";
import ROUTES from "../constants/routes";
import groupController from "../controllers/groupController";
import TodoController from "../controllers/todoController";

const router = express.Router();

router
  .route(ROUTES.TODOS)
  .get(TodoController.getAll)
  .post(TodoController.create);

router
  .route(ROUTES.GROUPS)
  .get(groupController.getAll)
  .post(groupController.create);
export default router;
