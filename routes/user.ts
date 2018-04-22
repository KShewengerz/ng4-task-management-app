"use strict";

import {Router} from "express";

import * as api from "../api/user";

const router: Router = Router();

router.post("/", api.addUser);
router.put("/", api.updateUser);
router.get("/:id", api.getUser);
router.delete("/:id", api.deleteUser);

export const userRoutes: Router = router;
