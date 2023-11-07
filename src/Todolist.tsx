import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Simulate} from "react-dom/test-utils";
import {TodoListType} from "./App";
import error = Simulate.error;

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type Propstype = {
    id: string
    title: string
    tasks: Array<TaskType>
    deleteTaskProps: (taskId: string, todolistId: string) => void
    addTaskProps: (title: string, todolistId: string) => void
    changeFilterProps: (value: FilterValuesType, todolistId:string) => void
    changeStatusProps: (taskId: string, isDone: boolean, todolistId: string) => void
    filterProps: FilterValuesType
    deleteTodoListProps: (todolistId: string) => void;
}

export function Todolist(props: Propstype) {
    // debugger

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    //выносим функции из return

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask();
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTaskProps(newTaskTitle.trim(), props.id);
            setNewTaskTitle('');
        } else {
            setError('Title is required');
        }

    }
    const onAllClickHandler = () => props.changeFilterProps('all', props.id);
    const onActiveClickHandler = () => props.changeFilterProps('active', props.id);
    const onCompletedClickHandler = () => props.changeFilterProps('completed', props.id);
    const deleteTodoListProps = () => {

       props.deleteTodoListProps(props.id);

    }
    return (

        <div>
            <h3>{props.title}<button onClick={deleteTodoListProps}>X</button></h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}

            </div>
            <ul>
                {
                    props.tasks.map((task) => {
                        const onDeleteHandler = () => {
                            props.deleteTaskProps(task.id, props.id)
                        }
                        const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
                            // console.log(task.id + e.currentTarget.checked)
                            props.changeStatusProps(task.id, e.currentTarget.checked, props.id)
                        }
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       onChange={onChangeChecked}
                                       checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={onDeleteHandler}>X</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filterProps === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filterProps === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filterProps === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}