"use strict";

import {Router} from "express";

import { api } from "../api/user/index";

const router: Router = Router();


/**
 * @api {post} /
 * @description Add new user
 */
router.post("/", api.addUser);

/**
 * @api {put} /:userId
 * @description Update's user information by userId
 *
 * @apiParam {Uuid} userId
 */
router.put("/:userId", api.updateUser);

/**
 * @api {get} /:id
 * @description Get user by userId
 *
 * @apiParam {Uuid} userId
 */
router.get("/:userId", api.getUser);

/**
 * @api {delete} /:userId
 * @description Delete user by userId
 *
 * @apiParam {Uuid} userId
 */
router.delete("/:userId", api.deleteUser);


/**
 * @description Holds user api routes
 *
 * @type {Router} userRoutes
 */
export const userRoutes: Router = router;
