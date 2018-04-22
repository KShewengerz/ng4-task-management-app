"use strict";

import {Router, Request, Response, NextFunction} from "express";


export function getProjects(req: Request, res: Response, next: NextFunction) {
    res.json("Get Projects all");
}

export function addProject(req: Request, res: Response, next: NextFunction) {
    res.json("Add Project");
}

export function deleteProject(req: Request, res: Response, next: NextFunction) {
    res.json("Delete Project");
}

export function updateProject(req: Request, res: Response, next: NextFunction) {
    res.json("Update Project");
}