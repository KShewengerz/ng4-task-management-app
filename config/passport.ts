import { PassportStatic } from "passport";
import * as passportLocal from "passport-local";
import * as bcrypt from "bcrypt";

import * as dbConnection from "../config/db";
import { User as UserEnum } from "../shared/enums/-index";
import { User } from "../shared/interfaces/-index";

const db = dbConnection.default;
const LocalStrategy = passportLocal.Strategy;


/**
 * @description Initialize Passport Local Strategy
 * @param {passport.PassportStatic} passport
 */
export function initializePassportLocalStrategy(passport: PassportStatic): void {
  passport.serializeUser((user: any, done: Function) => done(null, user.id));
  
  passport.deserializeUser(async (id: string, done: Function) => {
    await db(UserEnum.Table)
    .where({ id })
    .then(rows => done(null, rows))
    .catch(err => done(err));
  });
  
  passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
  }, (email: string, password: string, done: Function) => {
    process.nextTick(async () => {
      await db(UserEnum.Table)
      .where({ email_address: email })
      .then(rows => validateUser(password, rows[0], done))
      .catch(err => done(err));
    });
  }));
  
  function validateUser(password: string, user: User, done: Function): any {
    if (user) {
      const isValidPassword = bcrypt.compareSync(password, user.password);
      
      return isValidPassword ? done(null, user) : done(null, false, { message: "Invalid Password" });
    }
    else return done(null, false, { message: "User not found" });
  }
}