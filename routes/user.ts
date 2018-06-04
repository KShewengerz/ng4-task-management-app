"use strict";

import {Router} from "express";

import { api } from "../controllers/user/index";

const router: Router = Router();


/**
 * @controllers {post} /
 * @description Add new user
 */
router.post("/", api.addUser);

/**
 * @controllers {put} /:userId
 * @description Update's user information by userId
 *
 * @apiParam {Uuid} userId
 */
router.put("/:userId", api.updateUser);

/**
 * @controllers {get} /:id
 * @description Get user by userId
 *
 * @apiParam {Uuid} userId
 */
router.get("/:userId", api.getUser);

/**
 * @controllers {delete} /:userId
 * @description Delete user by userId
 *
 * @apiParam {Uuid} userId
 */
router.delete("/:userId", api.deleteUser);


/**
 * @description Holds user controllers routes
 *
 * @type {Router} userRoutes
 */
export const userRoutes: Router = router;
