import { Request, Response } from "express";
import prismaClient from "../config/prismaConfig";

class GroupController {
  async getAll(_req: Request, res: Response) {
    const groups = await prismaClient.todoGroup.findMany({
      include: {
        Todo: true,
      },
    });

    res.send({ groups });
  }

  async create(req: Request, res: Response) {
    const data = {
      enabled: req.body.enabled,
      name: req.body.name,
    };
    try {
      await prismaClient.todoGroup.create({ data });
      return res.sendStatus(201);
    } catch (error) {
      return res.status(500).send({
        error: true,
        message: error,
      });
    }
  }
}

export default new GroupController();
