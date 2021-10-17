const express = require('express');
const taskRouter = express.Router();
const {writeFile, readFile} = require('fs').promises;

const FILE_PATH = './data/task.json';
const tasks = {table: []};

const writeToFile = (tasksTable) => {
    writeFile(FILE_PATH, JSON.stringify(tasksTable, null, 2))
}

taskRouter
    .get('/getJson', async (req, res) => {
        try{
            const readedJSON = await readFile(FILE_PATH, 'utf8');
            res.json(readedJSON)
        }catch(error){
            return console.log(error);
        }
    })

    .post('/add', async (req, res) => {
        tasks.table.push(req.body)
        try{
            await writeToFile(tasks.table)
        }catch(error){
            console.log(error);
        }
        res.json(tasks.table)
    })

    .post('/delTask', async(req, res) => {
        const index = tasks.table.findIndex(obj => obj.task === req.body.name)

        delete tasks.table[index];

        const newTasks = tasks.table.filter( task => task !== null);

        try{
            await writeToFile(newTasks)
        }catch(error){
            console.log(error);
        }
        res.json(newTasks)
    })

    .post('/active', async(req, res) => {
        const index = tasks.table.findIndex(obj => obj.task === req.body.name)
        
        tasks.table[index].active ?  
        tasks.table[index].active = false 
        : 
        tasks.table[index].active = true ;

        try{
            await writeToFile(tasks.table);
        }catch(error){
            console.log(error);
        }
        res.json(tasks.table)  
    });

(async () => {
    try{
        const readedJSON = await readFile(FILE_PATH, 'utf8');
        const readed = JSON.parse(readedJSON, null, 2);
        tasks.table = readed;
    }catch(error){
        return console.log(error);
    }
})(); 

module.exports = {
    taskRouter,
};