"use strict";
Object.defineProperty(exports, "__esModule", {value: true});

function getTasks(req, res, next) {
    res.json("Get Tasks all");
}

exports.getTasks = getTasks;

function addTask(req, res, next) {
    res.json("Add Task");
}

exports.addTask = addTask;

function deleteTask(req, res, next) {
    res.json("Delete Task");
}

exports.deleteTask = deleteTask;

function updateTask(req, res, next) {
    res.json("Update Task");
}

exports.updateTask = updateTask;
//# sourceMappingURL=task.js.map