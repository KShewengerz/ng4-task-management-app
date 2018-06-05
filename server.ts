"use strict";

import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as favicon from "serve-favicon";
import * as passport from "passport";

import { initializePassportLocalStrategy } from "./config/passport";

import knex = require("./config/db");

import { homeRoute, userRoutes, taskRoutes, projectRoutes } from "./routes/-index";

const cors = require("cors");
const session = require("express-session");

export const Passport = passport;


export class Server {
  public app: express.Application;
  
  public static bootstrap(): Server {
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
  private middlewares(): void {
    // this.app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
    this.app.use(cors({ credentials: true, origin: true }));
    
    this.app.use(logger("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, "public")));
  
    this.app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }
  
  
  /**
   * Error Handlers
   */
  private catchErrors(): void {
    this.app.use((req: any, res: any, next: any) => {
      const err: any = new Error("Not Found");
      err.status = 404;
      
      next(err);
    });
    
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
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
  private initializePassport(): void {
    initializePassportLocalStrategy(passport);
  }
  
  
  /**
   * Assign API Routes
   */
  private routes(): void {
    this.app.use("/", homeRoute);
    this.app.use("/user", userRoutes);
    this.app.use("/task", taskRoutes);
    this.app.use("/project", projectRoutes);
  }
}