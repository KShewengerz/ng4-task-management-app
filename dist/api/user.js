"use strict";
Object.defineProperty(exports, "__esModule", {value: true});

function getUser(req, res, next) {
    res.json("Get User Info");
}

exports.getUser = getUser;

function addUser(req, res, next) {
    res.json("Add User Info");
}

exports.addUser = addUser;

function deleteUser(req, res, next) {
    res.json("Delete User Info");
}

exports.deleteUser = deleteUser;

function updateUser(req, res, next) {
    res.json("Update User Info");
}

exports.updateUser = updateUser;
//# sourceMappingURL=user.js.map