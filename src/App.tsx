import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {
    // debugger;

    let tasks1 = [
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'HTML', isDone: true},
        {id: 3, title: 'GIT', isDone: true},
        {id: 4, title: 'React', isDone: false},
        {id: 5, title: 'Redux', isDone: false},
    ];
    let tasks2: Array<TaskType> = [
        {id: 1, title: 'Титаник', isDone: false},
        {id: 2, title: 'Люди икс', isDone: true},
        {id: 3, title: 'Олдбой', isDone: true},
        {id: 4, title: 'Джуно', isDone: false},
        {id: 5, title: 'Киборг', isDone: false},
    ];
    let tasks3 = [
        {id: 1, title: 'Ramstein', isDone: true},
        {id: 2, title: 'Eminem', isDone: true},
        {id: 3, title: 'RPOP', isDone: true},
        {id: 4, title: 'KPOP', isDone: false},
        {id: 5, title: 'QPOP', isDone: false},
    ]
    return (
        <div className="App">
            <Todolist title={'Что изучать?'} tasks={tasks1}/>
            <Todolist title={'Что посмотреть?'} tasks={tasks2}/>
            <Todolist title={'Что прослушать?'} tasks={tasks3}/>
        </div>
    );
}

export default App;
