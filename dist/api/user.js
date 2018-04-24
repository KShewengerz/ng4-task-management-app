"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection = require("../config/db");
const db = dbConnection.default;
const userTable = "user";
function getUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const fetchUser = yield db(userTable).select();
        res.json(fetchUser);
    });
}
exports.getUser = getUser;
function addUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const insertUser = yield db(userTable).insert(req.body);
        res.json(insertUser);
    });
}
exports.addUser = addUser;
function deleteUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const deleteUser = yield db(userTable)
            .where({ id })
            .del();
        res.json(deleteUser);
    });
}
exports.deleteUser = deleteUser;
function updateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const updateUser = yield db(userTable)
            .where({ id: body.id })
            .update(body);
        res.json(updateUser);
    });
}
exports.updateUser = updateUser;
//# sourceMappingURL=user.js.map