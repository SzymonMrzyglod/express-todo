
const taskForm = document.querySelector('.task');
const textTask = document.querySelector('.task-text');
const todo = document.querySelector('.todo');
let delBtn;
let activeBtn;

//----------Downloading data from JSON file----------
(async () => {
    await fetch ('/task/getJson')
.then(res =>{
    return res.json()
})
.then(json => {
    createTaskView(JSON.parse(json))
})
})();

//----------Add new task----------
taskForm.addEventListener('submit', async e => {
    e.preventDefault();

    const task = textTask.value;
    if(task && task !== 'No data!'){
        const res = await fetch('/task/add', {
            method: 'POST',
            body: JSON.stringify({
                task,
                active: true,
            }),
            headers:{
                'Content-Type': 'application/json',
            },
        });
        render(await res.json())
        textTask.value = "";
    }else{
        textTask.value = 'No data!';
        setTimeout(() => {
            textTask.value = "";
        }, 1000); 
    }
})

//----------Remove task----------
const removeTask = async e => {
    const name = e.target.parentNode.parentNode.firstChild.textContent;
    const res = await fetch('/task/delTask', {
        method: 'POST',
        body: JSON.stringify({
            name,
        }),
        headers:{
            'Content-Type': 'application/json',
        },
    });
    render(await res.json())
}

//----------Change active task-----------
const activeTask = async e => {
    const name = e.target.parentNode.parentNode.firstChild.textContent;
    const res = await fetch('/task/active', {
        method: 'POST',
        body: JSON.stringify({
            name,
        }),
        headers:{
            'Content-Type': 'application/json',
        },
    });
    render(await res.json())
}

const render = (data) => {
    todo.innerText = "";
    createTaskView(data);
}

//----------Create a view----------
const createDivElement = (active, item) => {
    const divElement = document.createElement('div');
    divElement.classList.add('task-div');
    divElement.innerHTML = `<p class="active-${active}">${item.task}</p>`;
    
    const delBtn = document.createElement('button');
    delBtn.classList.add('btnDel');
    delBtn.innerHTML = '<i class="fas fa-minus-circle"></i>';

    const activeBtn = document.createElement('button');
    activeBtn.classList.add('activeBtn');
    activeBtn.innerHTML = '<i class="fas fa-check-circle"></i>';
    
    todo.appendChild(divElement);
    divElement.appendChild(delBtn)
    divElement.appendChild(activeBtn)
}

const addListenerBtns = () => {
    delBtn = document.querySelectorAll('.btnDel');
    delBtn.forEach(item => item.addEventListener('click',  removeTask));

    activeBtn = document.querySelectorAll('.activeBtn');
    activeBtn.forEach(item => item.addEventListener('click',  activeTask));
}

const createTaskView = (data) => {
    data.forEach((item) => {
        createDivElement(String(item.active), item);
    });
    addListenerBtns();
}




