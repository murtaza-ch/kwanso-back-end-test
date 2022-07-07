import mongoose from "mongoose";
import { Request, Response } from "express";
import Task from "../models/Task";

const ObjectID = mongoose.Types.ObjectId;

const create = async (req: Request, res: Response) => {
  try {
    const task = new Task({
      name: req.body.name,
    });

    const createdTask = await task.save();
    return res.status(201).json({ task: createdTask });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const list = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({});
    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteMany = async (req: Request, res: Response) => {
  try {
    let tasksDelete: any = [];

    req.body.forEach((item: string) => {
      const id = new ObjectID(item);
      tasksDelete.push(id);
    });

    await Task.deleteMany({ _id: { $in: tasksDelete } });

    return res.status(200).json("Deleted selected task!");
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default { create, list, deleteMany };
