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
 * @api {put} /project
 * @description Update Projects Ordinal
 */
router.put("/", api.updateTasksOrdinal);


/**
 * @api {put} /reschedule
 *
 * @description Reschedules a task
 */
router.put("/reschedule", api.rescheduleTask);


/**
 * @api {put} /:id
 * @apiParam {Uuid} id
 *
 * @description Updates task information.
 */
router.put("/:id", api.updateTask);


/**
 * @api {get} /:status/:projectId
 *
 * @apiParam {String} status
 * @apiParam {Any} projectId
 * 
 * @description Gets all open tasks.
 */
router.get("/:status/:projectId", api.getTasks);


/**
 * @api {put} /:id
 * @apiParam {Uuid} id
 *
 * @description Mark a task completed.
 */
router.put("/complete/:id", api.completeTask);


/**
 * @description Holds task controllers routes
 *
 * @type {Router} taskRoutes
 */
export const taskRoutes: Router = router;
