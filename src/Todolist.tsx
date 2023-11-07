import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    changeFilterProps: (value: FilterValuesType, todolistId: string) => void
    changeStatusProps: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filterProps: FilterValuesType
    deleteTodoListProps: (todolistId: string) => void;
    changeTodolistTitle: (id: string, newTitle: string) => void;
}

export function Todolist(props: Propstype) {
    // debugger
    const onAllClickHandler = () => props.changeFilterProps('all', props.id);
    const onActiveClickHandler = () => props.changeFilterProps('active', props.id);
    const onCompletedClickHandler = () => props.changeFilterProps('completed', props.id);
    const deleteTodoListProps = () => {
        props.deleteTodoListProps(props.id);
    }
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    }
    const addTask = (title: string) => {
        props.addTaskProps(title, props.id)
    }
    return (

        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <button onClick={deleteTodoListProps}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map((task) => {
                        const onClickHandler = () => {
                            props.deleteTaskProps(task.id, props.id)
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            // console.log(task.id + e.currentTarget.checked)
                            props.changeStatusProps(task.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(task.id, newValue, props.id)
                        }
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       onChange={onChangeStatusHandler}
                                       checked={task.isDone}/>

                                <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
                                <button onClick={onClickHandler}>X</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filterProps === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filterProps === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filterProps === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}

