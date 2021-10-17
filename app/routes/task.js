const express = require('express');
const taskRouter = express.Router();
const {
    getDataFromFile,
    addTask,
    delTask,
    activeTask
} = require('../controllers/task-controller')

taskRouter
    .get('/getJson', getDataFromFile)
    .post('/add', addTask)
    .post('/delTask', delTask)
    .post('/active', activeTask);

module.exports = {taskRouter};