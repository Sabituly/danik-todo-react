import React from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
type Propstype = {

    title: string
    tasks: Array<TaskType>
    deleteTaskProps: (taskId:number) => void
    changeFilterProps:(value: FilterValuesType) => void
}

export function Todolist(props: Propstype) {
    // debugger
    return (

        <div>
            <h3>{props.title}</h3>
            <div><input type="text"/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((task) => {

                        return (
                            <li>
                                <input type="checkbox" checked={task.isDone}/><span>{task.title}</span>
                                <button onClick={() =>(props.deleteTaskProps(task.id))}>X</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={() => {props.changeFilterProps('all')}}>All</button>
                <button onClick={()=>{props.changeFilterProps('active')}}>Active</button>
                <button onClick={() =>{props.changeFilterProps('completed')} }>Completed</button>
            </div>
        </div>
    )
}