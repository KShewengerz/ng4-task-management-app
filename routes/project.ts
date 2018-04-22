"use strict";

import {Router} from "express";

import * as api from "../api/project";

const router: Router = Router();

router.post("/", api.addProject);
router.put("/", api.deleteProject);
router.get("/", api.getProjects);
router.delete("/:id", api.deleteProject);

export const projectRoutes: Router = router;
