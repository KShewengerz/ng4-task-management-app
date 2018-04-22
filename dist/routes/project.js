"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const express_1 = require("express");
const api = require("../api/project");
const router = express_1.Router();
router.post("/", api.addProject);
router.put("/", api.deleteProject);
router.get("/", api.getProjects);
router.delete("/:id", api.deleteProject);
exports.projectRoutes = router;
//# sourceMappingURL=project.js.map