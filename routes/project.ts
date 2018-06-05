"use strict";

import {Router} from "express";

import { api } from "../controllers/project/index";

const router: Router = Router();


/**
 * @api {post} /user/:userId
 * @description Add new project by userId.
 *
 * @apiParam {Uuid} userId
 */
router.post("/", api.addProjectByUserId);


/**
 * @api {put} /project/:projectId/user/:userId
 * @description Update Project by projectId
 *
 * @apiParam {Uuid} id
 */
router.put("/:id", api.updateProject);


/**
 * @api {get} /:id
 * @description Get project by projectId
 */
router.get("/:id", api.getProjectById);


/**
 * @api {get} /user/:userId
 * @description Get projects by userId
 */
router.get("/", api.getProjects);


/**
 * @api {get} /:id
 * @description Delete Project by projectId
 *
 * @apiParam {Uuid} id
 */
router.delete("/:id", api.deleteProject);


/**
 * @description Holds project controllers routes
 *
 * @type {Router} userRoutes
 */
export const projectRoutes: Router = router;
