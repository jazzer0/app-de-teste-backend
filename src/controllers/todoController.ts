import { Request, Response } from "express";
import prismaClient from "../config/prismaConfig";

class TodoController {
  async getAll(_req: Request, res: Response) {
    const todos = await prismaClient.todo.findMany();

    res.send({ todos });
  }

  async create(req: Request, res: Response) {
    const data = {
      enabled: req.body.enabled,
      text: req.body.text,
      todoGroupId: req.body.todoGroupId,
    };
    try {
      await prismaClient.todo.create({ data });
      return res.sendStatus(201);
    } catch (error) {
      return res.status(500).send({
        error: true,
        message: error,
      });
    }
  }
}

export default new TodoController();
