const {writeFile, readFile} = require('fs').promises;

const FILE_PATH = './app/data/task.json';
const tasks = {table: []};

const writeToFile = async (tasksTable) => {
   await writeFile(FILE_PATH, JSON.stringify(tasksTable, null, 2))
};

const getDataFromFile = async (req, res) => {
    try{
        const readedJSON = await readFile(FILE_PATH, 'utf8');
        res.json(readedJSON)
    }catch(error){
        return console.log(error);
    }
};

const addTask = async (req, res) => {
    tasks.table.push(req.body)
    
    try{
        writeToFile(tasks.table)
        res.json(tasks.table)
    }catch(error){
        console.log(error);
    }
};

const delTask = async(req, res) => {
    const index = tasks.table.findIndex(obj => obj.id === req.body.id)
    delete tasks.table[index];

    const newTasks = tasks.table.filter( task => task !== null);

    try{
       writeToFile(newTasks)
       res.json(newTasks)
    }catch(error){
        return console.log(error);
    }
};

const activeTask = async(req, res) => {
    const index = tasks.table.findIndex(obj => obj.id === req.body.id)
    
    tasks.table[index].active ?  
    tasks.table[index].active = false 
    : 
    tasks.table[index].active = true ;

    try{
        writeToFile(tasks.table);
        res.json(tasks.table)  
    }catch(error){
        console.log(error);
    }
};

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
    getDataFromFile,
    addTask,
    delTask,
    activeTask
}