"use strict";

import {Router} from "express";

import { api } from "../controllers/user/index";

const router: Router = Router();


/**
 * @description Add new user
 */
router.post("/", api.addUser);


/**
 * @description Update current user information
 *
 * @apiParam {Uuid} userId
 */
router.put("/", api.updateUser);


/**
 * @description Get user by userId
 *
 * @apiParam {Uuid} userId
 */
router.get("/", api.getAllUsers);


/**
 * @description Get user by userId
 *
 * @apiParam {Uuid} userId
 */
router.get("/:userId", api.getUser);


/**
 * @description Delete user by userId
 *
 * @apiParam {Uuid} userId
 */
router.delete("/:userId", api.deleteUser);


/**
 * @description Passport Local Authentication
 */
router.post("/login", api.login);


/**
 * @description Log Out User
 */
router.post("/logout", api.logout);


/**
 * @description Compare Password if equal with user's hashed password
 */
router.get("/compare-password/:password", api.comparePassword);


/**
 * @description Change User Password
 */
router.put("/change-password", api.changePassword);


/**
 * @description Holds user controllers routes
 *
 * @type {Router} userRoutes
 */
export const userRoutes: Router = router;
