import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    // debugger;
    // let arr = useState(initTasks)
    // let tasksObj = arr[0];
    // let setTasks = arr[1];
    //прописываем функции
    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(task => task.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasksObj({...tasksObj});
        }

    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(task => task.id === taskId);
        if (task) {
            task.title = newTitle;
            setTasksObj({...tasksObj});
        }

    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }

    function deleteTask(taskId: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(task => task.id !== taskId);
        tasksObj[todolistId] = filteredTasks;

        setTasksObj({...tasksObj});
    }

    function addTask(incomingTitle: string, todolistId: string) {

        let newTask = {id: v1(), title: incomingTitle, isDone: false};
        let tasks = tasksObj[todolistId];
        let newTasks = [newTask, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasksObj({...tasksObj});
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistId1, title: 'Что изучать?', filter: 'active'},
        {id: todolistId2, title: 'Что посмотреть?', filter: 'completed'}
    ]);

    let deleteTodoList = (todolistId: string) => {
        let filteredTodoLists = todolists.filter(tl => tl.id !== todolistId);
        setTodolists(filteredTodoLists);
        delete tasksObj[todolistId];
        setTasksObj({...tasksObj});
    }

    let [tasksObj, setTasksObj] = useState<TaskStateType>({

        [todolistId1]: [

            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'GIT', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],

        [todolistId2]: [

            {id: v1(), title: 'Terminator', isDone: true},
            {id: v1(), title: 'Avatar 2', isDone: true},
            {id: v1(), title: 'Lethal weapon 3', isDone: false},
            {id: v1(), title: 'Scream 4', isDone: false},
            {id: v1(), title: 'Star wars 5', isDone: false},
        ]
    });

    // allTasks[todolistId1] - обращение к объекту так как id имеет пробелы и -
    function changeTodolistTitle(id: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === id);
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists])
        }
    }

    function addTodolist(title: string) {
        let todolist: TodoListType = {
            id: v1(),
            filter: 'all',
            title: title
        };
        setTodolists([todolist, ...todolists]);
        setTasksObj({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>
                        Мои список задач
                    </Typography>
                    {/*<Button color={'inherit'}>Залогиниться</Button>*/}
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((todolist) => {

                            let tasksForTodoList = tasksObj[todolist.id];
                            if (todolist.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
                            }
                            if (todolist.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
                            }

                            return <Grid item>
                                   <Paper style={{padding: "10px", backgroundColor: "whitesmoke"}}>
                                <Todolist key={todolist.id}
                                                         id={todolist.id}
                                                         title={todolist.title}
                                                         tasks={tasksForTodoList}
                                                         deleteTaskProps={deleteTask}
                                                         changeFilterProps={changeFilter}
                                                         addTaskProps={addTask}
                                                         changeStatusProps={changeTaskStatus}
                                                         changeTaskTitle={changeTaskTitle}
                                                         filterProps={todolist.filter}
                                                         deleteTodoListProps={deleteTodoList}
                                                         changeTodolistTitle={changeTodolistTitle}
                            />
                              </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
