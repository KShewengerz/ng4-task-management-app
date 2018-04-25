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
const user_1 = require("../shared/constants/db-table-fields/user");
const error_1 = require("../shared/enums/error");
const error_message_1 = require("../shared/constants/error-message");
const db = dbConnection.default;
function getUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const fetchUser = yield db(user_1.userTable).where({ id });
        res.json(fetchUser);
    });
}
exports.getUser = getUser;
function addUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield userValidation(req.body);
        if (res.statusCode !== 404) {
            const insertUser = yield db(user_1.userTable)
                .insert(req.body)
                .then(rows => rows[0])
                .catch(err => err);
            res.json(insertUser);
        }
    });
}
exports.addUser = addUser;
function deleteUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const deleteUser = yield db(user_1.userTable)
            .where({ id })
            .del()
            .catch(err => err);
        res.json(deleteUser);
    });
}
exports.deleteUser = deleteUser;
function updateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const body = req.body;
        //TODO: Block update if id, username and emailAddress already exist with other users
        const updateUser = yield db(user_1.userTable)
            .where({ id })
            .update(body)
            .catch(err => err);
        res.json(updateUser);
    });
}
exports.updateUser = updateUser;
function userValidation(data, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errorHandler = new error_message_1.ErrorHandler();
        const { id, emailAddress, username } = data;
        const isIdExists = db(user_1.userTable)
            .count({ id: user_1.userFields.Id })
            .where({ id });
        const isUsernameExists = db(user_1.userTable)
            .count({ username: user_1.userFields.Username })
            .where({ [user_1.userFields.Username]: username });
        const isEmailAddressExists = db(user_1.userTable)
            .count({ email_address: user_1.userFields.EmailAddress })
            .where({ [user_1.userFields.EmailAddress]: emailAddress });
        const result = yield Promise.all([
            isIdExists,
            isUsernameExists,
            isEmailAddressExists
        ]).then((data) => __awaiter(this, void 0, void 0, function* () {
            const filterFields = yield errorHandler.filterExistingFields(data);
            const errorMessages = yield errorHandler.getErrorMessages(error_1.Error.Duplicate);
            if (errorMessages.length > 0)
                res.status(404).send({ errorMessages });
        }))
            .catch(err => err);
    });
}
//# sourceMappingURL=user.js.map