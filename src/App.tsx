import React, {useState} from 'react';
import './App.css';
import { TaskType, Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {
    // debugger;
    // let arr = useState(initTasks)
    // let tasks = arr[0];
    // let setTasks = arr[1];

    let [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: 1, title: 'CSS', isDone: true},
            {id: 2, title: 'HTML', isDone: true},
            {id: 3, title: 'GIT', isDone: true},
            {id: 4, title: 'React', isDone: false},
            {id: 5, title: 'Redux', isDone: false},
        ]
    );

    let [filter, setFilter] = useState<FilterValuesType>('all')

    //прописываем функции

    function changeFilter (value: FilterValuesType) {

        setFilter(value);
    }
    function deleteTask(taskId: number) {
        let filteredTasks = tasks.filter((task) => {

            return task.id !== taskId

        })
        setTasks(filteredTasks);
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
            />
        </div>
    );
}

export default App;
