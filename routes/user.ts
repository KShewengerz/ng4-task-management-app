"use strict";

import {Router} from "express";

import * as api from "../api/user/user";

const router: Router = Router();

router.post("/", api.addUser);
router.put("/:id", api.updateUser);
router.get("/:id", api.getUser);
router.delete("/:id", api.deleteUser);

export const userRoutes: Router = router;
