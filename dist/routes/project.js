"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../controllers/project/index");
const router = express_1.Router();
/**
 * @api {post} /user/:userId
 * @description Add new project by userId.
 *
 * @apiParam {Uuid} userId
 */
router.post("/", index_1.api.addProjectByUserId);
/**
 * @api {put} /project/:projectId/user/:userId
 * @description Update Project by projectId
 *
 * @apiParam {Uuid} id
 */
router.put("/:id", index_1.api.updateProject);
/**
 * @api {get} /:id
 * @description Get project by projectId
 */
router.get("/:id", index_1.api.getProjectById);
/**
 * @api {get} /user/:userId
 * @description Get projects by userId
 */
router.get("/", index_1.api.getProjects);
/**
 * @api {get} /:id
 * @description Delete Project by projectId
 *
 * @apiParam {Uuid} id
 */
router.delete("/:id", index_1.api.deleteProject);
/**
 * @description Holds project controllers routes
 *
 * @type {Router} userRoutes
 */
exports.projectRoutes = router;
//# sourceMappingURL=project.js.map