"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const path = require("path");
// Api Routes
const index_1 = require("./routes/index");
const user_1 = require("./routes/user");
const task_1 = require("./routes/task");
const project_1 = require("./routes/project");
class Server {
    static bootstrap() {
        return new Server;
    }
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
        this.catchErrors();
    }
    middlewares() {
        // this.app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, "public")));
    }
    catchErrors() {
        // catch 404 and forward to error handler
        this.app.use((req, res, next) => {
            const err = new Error("Not Found");
            err.status = 404;
            next(err);
        });
        // error handler
        this.app.use((err, req, res, next) => {
            const statusCode = err.status || 500;
            res.locals.message = err.message;
            res.locals.error = req.app.get("env") === "development" ? err : {};
            // render the error page
            res.status(statusCode);
            res.send("Server Error", statusCode);
        });
    }
    routes() {
        this.app.use("/", index_1.indexRoutes);
        this.app.use("/user", user_1.userRoutes);
        this.app.use("/task", task_1.taskRoutes);
        this.app.use("/project", project_1.projectRoutes);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map