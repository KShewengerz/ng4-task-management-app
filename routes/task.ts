"use strict";

import {Router} from "express";

import { api } from "../controllers/task/-index";

const router: Router = Router();


/**
 * @api {post} /
 * @description Adds new task.
 */
router.post("/", api.addTask);


/**
 * @api {put} /:id
 * @apiParam {Uuid} id
 *
 * @description Updates task information.
 */
router.put("/:id", api.updateTask);


/**
 * @api {get} /:projectId
 * @apiParam {any} projectId
 * 
 * @description Gets all user tasks.
 */
router.get("/:projectId", api.getTasksByProjectId);


/**
 * @api {put} /:id
 * @apiParam {Uuid} id
 *
 * @description Deletes a task.
 */
router.put("/complete/:id", api.completeTask);


/**
 * @description Holds task controllers routes
 *
 * @type {Router} taskRoutes
 */
export const taskRoutes: Router = router;
