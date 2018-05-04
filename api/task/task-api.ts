"use strict";

import { Request, Response, NextFunction } from "express";

import { TaskField } from "../../shared/enums/index";
import { Task } from "../../shared/interfaces/index";
import { taskQuery, taskValidation, taskErrorHandler } from "./index";


export function getTasks(req: Request, res: Response, next: NextFunction) {
  res.json("Get Tasks all");
}

export function addTask(req: Request, res: Response, next: NextFunction) {
  res.json("Add Task");
}

export function deleteTask(req: Request, res: Response, next: NextFunction) {
  res.json("Delete Task");
}

export function updateTask(req: Request, res: Response, next: NextFunction) {
  res.json("Update Task");
}