"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const express_1 = require("express");
const api = require("../api/task");
const router = express_1.Router();
router.post("/", api.addTask);
router.put("/", api.updateTask);
router.get("/", api.getTasks);
router.delete("/:id", api.deleteTask);
exports.taskRoutes = router;
//# sourceMappingURL=task.js.map