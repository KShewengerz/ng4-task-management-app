"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const express_1 = require("express");
const api = require("../api/project/project");
const router = express_1.Router();
/**
 * @api {post} /
 * @description Add new project
 *
 * @apiParam {Uuid} userId
 */
router.post("/", api.addProject);
/**
 * @api {put} /project/:projectId/user/:userId
 * @description Update Project by id and user id
 *
 * @apiParam {Uuid} projectId
 * @apiParam {Uuid} userId
 */
router.put("/project/:projectId/user/:userId", api.deleteProject);
/**
 * @api {get} /user/:userId
 * @description Get projects by userId
 */
router.get("/user/:userId", api.getProjectsByUserId);
/**
 * @api {get} /project/:projectId/user/:userId
 * @description Delete Project by id and user id
 *
 * @apiParam {Uuid} projectId
 * @apiParam {Uuid} userId
 */
router.delete("/project/:projectId/user/:userId", api.deleteProject);
/**
 * @description Holds project api routes
 *
 * @type {Router} userRoutes
 */
exports.projectRoutes = router;
//# sourceMappingURL=project.js.map