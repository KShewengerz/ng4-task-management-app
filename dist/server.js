"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const passport = require("passport");
const passport_1 = require("./config/passport");
const _index_1 = require("./routes/-index");
const cors = require("cors");
const session = require("express-session");
exports.Passport = passport;
class Server {
    static bootstrap() {
        return new Server;
    }
    constructor() {
        this.app = express();
        this.middlewares();
        this.initializePassport();
        this.routes();
        this.catchErrors();
    }
    /**
     * Middlewares
     */
    middlewares() {
        // this.app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }
    /**
     * Error Handlers
     */
    catchErrors() {
        this.app.use((req, res, next) => {
            const err = new Error("Not Found");
            err.status = 404;
            next(err);
        });
        this.app.use((err, req, res, next) => {
            const statusCode = err.status || 500;
            res.locals.message = err.message;
            res.locals.error = req.app.get("env") === "development" ? err : {};
            res.status(statusCode);
            res.status(statusCode).send("Server Error");
        });
    }
    /**
     * Initialize Passport Strategies
     */
    initializePassport() {
        passport_1.initializePassportLocalStrategy(passport);
    }
    /**
     * Assign API Routes
     */
    routes() {
        this.app.use("/", _index_1.homeRoute);
        this.app.use("/user", _index_1.userRoutes);
        this.app.use("/task", _index_1.taskRoutes);
        this.app.use("/project", _index_1.projectRoutes);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map