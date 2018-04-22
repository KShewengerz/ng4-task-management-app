"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const express_1 = require("express");
const router = express_1.Router();
// /* GET home page. */
router.get("/", (req, res, next) => {
    res.send("Welcome to Express");
});
exports.indexRoutes = router;
//# sourceMappingURL=index.js.map