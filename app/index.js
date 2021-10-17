const express = require('express');
const {taskRouter} = require('./routes/task');

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use('/task', taskRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});