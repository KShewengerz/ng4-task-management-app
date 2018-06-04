"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../controllers/user/index");
const router = express_1.Router();
/**
 * @controllers {post} /
 * @description Add new user
 */
router.post("/", index_1.api.addUser);
/**
 * @controllers {put} /:userId
 * @description Update's user information by userId
 *
 * @apiParam {Uuid} userId
 */
router.put("/:userId", index_1.api.updateUser);
/**
 * @controllers {get} /:id
 * @description Get user by userId
 *
 * @apiParam {Uuid} userId
 */
router.get("/:userId", index_1.api.getUser);
/**
 * @controllers {delete} /:userId
 * @description Delete user by userId
 *
 * @apiParam {Uuid} userId
 */
router.delete("/:userId", index_1.api.deleteUser);
/**
 * @description Holds user controllers routes
 *
 * @type {Router} userRoutes
 */
exports.userRoutes = router;
//# sourceMappingURL=user.js.map