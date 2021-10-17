const express = require('express');
const {taskRouter} = require('./routes/task');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use('/task', taskRouter);

app.listen(PORT);