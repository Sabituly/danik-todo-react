import React from "react";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}
type Propstype = {

    title: string,
    tasks: Array<TaskType>
}
export function Todolist(props:Propstype) {
    // debugger
    return (

        <div>
            <h3>{props.title}</h3>
            <div><input type="text"/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/><span>{props.tasks[2].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[3].isDone}/><span>{props.tasks[3].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[4].isDone}/><span>{props.tasks[4].title}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}