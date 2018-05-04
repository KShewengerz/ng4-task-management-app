"use strict";

import {Router} from "express";

import { api } from "../api/task/index";

const router: Router = Router();

router.post("/", api.addTask);
router.put("/", api.updateTask);
router.get("/", api.getTasks);
router.delete("/:id", api.deleteTask);

export const taskRoutes: Router = router;
