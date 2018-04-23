"use strict";

import {Router, Request, Response, NextFunction} from "express";


export function getUser(req: Request, res: Response, next: NextFunction) {
  res.json("Get User Info");
}

export function addUser(req: Request, res: Response, next: NextFunction) {
  res.json("Add User Info");
}

export function deleteUser(req: Request, res: Response, next: NextFunction) {
  res.json("Delete User Info");
}

export function updateUser(req: Request, res: Response, next: NextFunction) {
  res.json("Update User Info");
}