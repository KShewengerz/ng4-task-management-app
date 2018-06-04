"use strict";

import {Router} from "express";

import { api } from "../controllers/task/index";

const router: Router = Router();


/**
 * @controllers {post} /
 * @description Adds new task.
 */
router.post("/", api.addTask);


/**
 * @controllers {put} /:id
 * @apiParam {Uuid} id
 *
 * @description Updates task information.
 */
router.put("/:id", api.updateTask);


/**
 * @controllers {get} /
 * @description Gets all user tasks.
 */
router.get("/", api.getTasks);


/**
 * @controllers {delete} /:id
 * @apiParam {Uuid} id
 *
 * @description Deletes a task.
 */
router.delete("/:id", api.deleteTask);


/**
 * @description Holds task controllers routes
 *
 * @type {Router} taskRoutes
 */
export const taskRoutes: Router = router;
