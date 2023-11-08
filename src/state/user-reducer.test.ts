import {userReducer} from "./user-reducer";


test('user reducer should increment only age', ()=> {
    const startState = {age: 18, childrenCount: 0, name: 'Daniyar'};
    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(19);
    expect(endState.childrenCount).toBe(0);
});
test('user reducer should increment only childrenCount', ()=> {
    const startState = {age: 18, childrenCount: 0, name: 'Daniyar'};
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.age).toBe(18);
    expect(endState.childrenCount).toBe(1);
});

//TDD example
test('user reducer should change name of user', ()=> {
    const startState = {age: 18, childrenCount: 0, name: 'Daniyar'};
    const newName = 'Winner'
    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})

    expect(endState.name).toBe(newName);
});