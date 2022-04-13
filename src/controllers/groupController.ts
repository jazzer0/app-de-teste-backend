import { Request, Response } from "express";
import prismaClient from "../config/prismaConfig";

class GroupController {
  async getAll(_req: Request, res: Response) {
    const groups = await prismaClient.todoGroup.findMany({
      include: {
        Todo: true,
      },
    });

    res.send({ data: groups });
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

  async edit(req: Request, res: Response) {
    const groupId = req.params.id;
    const data = {
      enabled: req.body.enabled,
      name: req.body.name,
    };

    if (!groupId) {
      return res.status(400).send({
        error: true,
        message: "id is mandatory",
      });
    }

    try {
      await prismaClient.todoGroup.update({
        where: { id: groupId },
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
    const groupId = req.params.id;

    if (!groupId) {
      return res.status(400).send({
        error: true,
        message: "id is mandatory",
      });
    }

    try {
      await prismaClient.todoGroup.delete({
        where: {
          id: groupId,
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

export default new GroupController();
