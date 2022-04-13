import { Request, Response } from "express";
import prismaClient from "../config/prismaConfig";
import { validate } from "../helpers";

class TodoController {
  async getAll(_req: Request, res: Response) {
    const todos = await prismaClient.todo.findMany();
    res.send({ data: todos });
  }

  async create(req: Request, res: Response) {
    const data = {
      enabled: req.body.enabled,
      text: req.body.text,
      groupId: req.body.groupId,
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

  async edit(req: Request, res: Response) {
    const todoId = req.params.id;
    const data = {
      enabled: req.body.enabled,
      text: req.body.text,
      groupId: req.body.groupId,
    };

    const validatePayload = { ...data, todoId };

    if (!validate(validatePayload)) {
      return res.status(400).send({
        error: true,
        message: "id is mandatory",
      });
    }

    try {
      await prismaClient.todo.update({
        where: { id: todoId },
        data,
      });
      return res.sendStatus(200);
    } catch (error) {
      return res.status(500).send({
        error: true,
        message: error,
      });
    }
  }

  async delete(req: Request, res: Response) {
    const todoId = req.params.id;

    if (!todoId) {
      return res.status(400).send({
        error: true,
        message: "id is mandatory",
      });
    }

    try {
      await prismaClient.todo.delete({
        where: {
          id: todoId,
        },
      });

      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        error: true,
        message: error,
      });
    }
  }
}

export default new TodoController();
