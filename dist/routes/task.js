"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../api/task/index");
const router = express_1.Router();
/**
 * @api {post} /
 * @description Adds new task.
 */
router.post("/", index_1.api.addTask);
/**
 * @api {put} /:id
 * @apiParam {Uuid} id
 *
 * @description Updates task information.
 */
router.put("/:id", index_1.api.updateTask);
/**
 * @api {get} /
 * @description Gets all user tasks.
 */
router.get("/", index_1.api.getTasks);
/**
 * @api {delete} /:id
 * @apiParam {Uuid} id
 *
 * @description Deletes a task.
 */
router.delete("/:id", index_1.api.deleteTask);
/**
 * @description Holds task api routes
 *
 * @type {Router} taskRoutes
 */
exports.taskRoutes = router;
//# sourceMappingURL=task.js.map