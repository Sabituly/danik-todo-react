import React, {useState} from 'react';
import './App.css';
import { TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {
    // debugger;
    // let arr = useState(initTasks)
    // let tasks = arr[0];
    // let setTasks = arr[1];

    let [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'GIT', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ]
    );
    console.log(tasks);
    let [filter, setFilter] = useState<FilterValuesType>('all')

    //прописываем функции

    function changeFilter (value: FilterValuesType) {

        setFilter(value);
    }
    function deleteTask(taskId: string) {
        let filteredTasks = tasks.filter((task) => {

            return task.id !== taskId

        })
        setTasks(filteredTasks);
    }

    function addTask(incomingTitle: string) {

        let newTask = {id: v1(), title: incomingTitle, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    let tasksForTodoList = tasks;
    if(filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }
    if(filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }

    return (
        <div className="App">
            <Todolist title={'Что изучать?'}
                      tasks={tasksForTodoList}
                      deleteTaskProps={deleteTask}
                      changeFilterProps={changeFilter}
                      addTaskProps={addTask}
            />
        </div>
    );
}

export default App;
