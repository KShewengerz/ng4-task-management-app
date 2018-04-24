"use strict";

import { Router, Request, Response, NextFunction } from "express";

import * as dbConnection from "../config/db";

const db = dbConnection.default;
const userTable = "user";


export async function getUser(req: Request, res: Response, next: NextFunction) {
  const fetchUser = await db(userTable).select();
  
  res.json(fetchUser);
}

export async function addUser(req: Request, res: Response, next: NextFunction) {
  const insertUser = await db(userTable).insert(req.body);
  
  res.json(insertUser);
  
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  
  const deleteUser = await db(userTable)
  .where({ id })
  .del();
  
  res.json(deleteUser);
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  
  const updateUser = await db(userTable)
  .where({ id: body.id })
  .update(body);
  
  res.json(updateUser);
}