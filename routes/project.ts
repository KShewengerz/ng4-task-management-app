"use strict";

import {Router} from "express";

import { api } from "../controllers/project/index";

const router: Router = Router();


/**
 * @controllers {post} /user/:userId
 * @description Add new project by userId.
 *
 * @apiParam {Uuid} userId
 */
router.post("/", api.addProjectByUserId);


/**
 * @controllers {put} /project/:projectId/user/:userId
 * @description Update Project by projectId
 *
 * @apiParam {Uuid} id
 */
router.put("/:id", api.updateProject);


/**
 * @controllers {get} /:id
 * @description Get project by projectId
 */
router.get("/:id", api.getProjectById);


/**
 * @controllers {get} /user/:userId
 * @description Get projects by userId
 */
router.get("/", api.getProjects);


/**
 * @controllers {get} /:id
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
