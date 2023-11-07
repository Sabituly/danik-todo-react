import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
                <IconButton  onClick={deleteTodoListProps}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
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
                            <div key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <Checkbox color={'primary'} onChange={onChangeStatusHandler} checked={task.isDone}/>
                                <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
                                <IconButton  onClick={onClickHandler}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <Button variant={props.filterProps === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color={'primary'} variant={props.filterProps === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color='secondary' variant={props.filterProps === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}

