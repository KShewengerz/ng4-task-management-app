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
const error_handler_1 = require("./error-handler");
const http_verb_1 = require("../shared/enums/http-verb");
const snakeCase = require("snakecase-keys");
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
        const body = snakeCase(req.body);
        yield userValidation(body, http_verb_1.HttpVerb.POST, res);
        if (res.statusCode !== 409) {
            const insertUser = yield db(user_1.userTable)
                .insert(body)
                .then(rows => rows[0])
                .catch(err => err);
            res.status(201);
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
        res.status(204);
    });
}
exports.deleteUser = deleteUser;
function updateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const body = snakeCase(req.body);
        body.id = id;
        yield userValidation(body, http_verb_1.HttpVerb.PUT, res, id);
        if (res.statusCode !== 409) {
            const updateUser = yield db(user_1.userTable)
                .where({id})
                .update(body)
                .catch(err => err);
            res.json(updateUser);
        }
    });
}
exports.updateUser = updateUser;

function userValidation(data, httpVerb, res, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const errorHandler = new error_handler_1.ErrorHandler();
        const httpAction = fetchValidationByHttpAction(data, httpVerb);
        yield Promise.all(httpAction).then((data) => __awaiter(this, void 0, void 0, function* () {
            const filterFields = yield errorHandler.filterExistingFields(data);
            const errorMessages = yield errorHandler.getErrorMessages(error_1.Error.Duplicate);
            if (errorMessages.length > 0)
                res.status(409).send({errorMessages});
        }))
            .catch(err => err);
    });
}

function fetchValidationByHttpAction(data, httpAction) {
    if (httpAction === http_verb_1.HttpVerb.POST)
        return fetchPostValidation(data);
    else
        fetchPutValidation(data);
}

function fetchPostValidation(data) {
    const {id, username, email_address} = snakeCase(data);
    const isIdExists = db(user_1.userTable)
        .where({id})
        .count({id: user_1.userFields.Id});
    const isUsernameExists = db(user_1.userTable)
        .where({username})
        .count({username: user_1.userFields.Username});
    const isEmailAddressExists = db(user_1.userTable)
        .where({email_address})
        .count({email_address: user_1.userFields.EmailAddress});
    const validations = [
        isIdExists,
        isUsernameExists,
        isEmailAddressExists
    ];
    return validations;
}

function fetchPutValidation(data) {
    const {id, username, email_address} = snakeCase(data);
    const isUsernameExists = db(user_1.userTable)
        .where({username})
        .andWhereNot({id, username})
        .count({username: user_1.userFields.Username});
    const isEmailAddressExists = db(user_1.userTable)
        .where({email_address})
        .andWhereNot({id, email_address})
        .count({email_address: user_1.userFields.EmailAddress});
    const validations = [
        isUsernameExists,
        isEmailAddressExists
    ];
    return validations;
}
//# sourceMappingURL=user.js.map