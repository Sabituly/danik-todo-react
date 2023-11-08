import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";
import {
    AddTodolistAC, ChangeTodolistFilterAC,
    ChangeTodolistFilterActionType,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./todolists-reducer";


test('correct todolist should be removed', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'Что изучать?', filter:'all'},
        {id: todolistId2, title: 'Что посмотреть?', filter:'all'}
    ];

    // const endState = todolistsReducer(startState,
    //     {type: 'REMOVE-TODOLIST',
    //         id: todolistId1
    //     })
    const endState = todolistsReducer(startState,RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})

test('correct todolist should be added', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodoListTitle = 'New Todolist';

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'Что изучать?', filter:'all'},
        {id: todolistId2, title: 'Что посмотреть?', filter:'all'}
    ];

    const endState = todolistsReducer(startState, AddTodolistAC(newTodoListTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodoListTitle);
    expect(endState[2].filter).toBe('all');
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "Что изучать?", filter: "all"},
        {id: todolistId2, title: "Что посмотреть?", filter: "all"}
    ]
    const action = ChangeTodolistTitleAC(todolistId2, newTodolistTitle)

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("Что изучать?");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "Что изучать?", filter: "all"},
        {id: todolistId2, title: "Что посмотреть?", filter: "all"}
    ]

    const action = ChangeTodolistFilterAC(todolistId2, newFilter);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});










