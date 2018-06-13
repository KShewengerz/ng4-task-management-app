"use strict";

import {Router} from "express";

import { api } from "../controllers/user/-index";

const router: Router = Router();


/**
 * @description Passport Local Authentication
 */
router.post("/login", api.login);


/**
 * @description Log Out User
 */
router.get("/logout", api.logout);


/**
 * @description Add new user
 */
router.post("/", api.addUser);


/**
 * @description Update current user information
 */
router.put("/", api.updateUser);


/**
 * @description Get All Users
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
