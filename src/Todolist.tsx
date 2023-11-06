import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type Propstype = {

    title: string
    tasks: Array<TaskType>
    deleteTaskProps: (taskId: string) => void
    addTaskProps: (title: string) => void
    changeFilterProps: (value: FilterValuesType) => void
}

export function Todolist(props: Propstype) {
    // debugger

    const [newTaskTitle, setNewTaskTitle] = useState('');

    //выносим функции из return

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTaskProps(newTaskTitle);
            setNewTaskTitle('');
        }
    }
    const addTask = () => {
        props.addTaskProps(newTaskTitle);
        setNewTaskTitle('');
    }

    function addTaskk() {
        props.addTaskProps(newTaskTitle);
        setNewTaskTitle('');
    }

    const onAllClickHandler = () => props.changeFilterProps('all');
    const onActiveClickHandler = () => props.changeFilterProps('active');
    const onCompletedClickHandler = () => props.changeFilterProps('completed');

    return (

        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((task) => {
                        const onDeleteHandler = () => {
                            props.deleteTaskProps(task.id)
                        }
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={onDeleteHandler}>X</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}