"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const express_1 = require("express");
const api = require("../api/user");
const router = express_1.Router();
router.post("/", api.addUser);
router.put("/", api.updateUser);
router.get("/:id", api.getUser);
router.delete("/:id", api.deleteUser);
exports.userRoutes = router;
//# sourceMappingURL=user.js.map