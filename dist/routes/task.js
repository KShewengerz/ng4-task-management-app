"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../api/task/index");
const router = express_1.Router();
router.post("/", index_1.api.addTask);
router.put("/", index_1.api.updateTask);
router.get("/", index_1.api.getTasks);
router.delete("/:id", index_1.api.deleteTask);
exports.taskRoutes = router;
//# sourceMappingURL=task.js.map