import { group } from "console";
import express from "express";
import ROUTES from "../constants/routes";
import groupController from "../controllers/groupController";
import TodoController from "../controllers/todoController";

const router = express.Router();

router
  .route(ROUTES.TODOS)
  .get(TodoController.getAll)
  .post(TodoController.create)
  .put(TodoController.edit)
  .delete(TodoController.delete);

router
  .route(ROUTES.GROUPS)
  .get(groupController.getAll)
  .post(groupController.create)
  .put(groupController.edit)
  .delete(groupController.delete);
export default router;
