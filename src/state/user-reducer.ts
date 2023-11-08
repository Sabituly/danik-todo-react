type StateType = {

    age: number
    childrenCount: number
    name: string
}


type ActionType = {

    type: string
    [key: string] : any
}
export const userReducer = (state: StateType, action: ActionType) : StateType => {

    switch (action.type) {
        case 'INCREMENT-AGE':
            let newState  = {...state}; // правило иммутабельности
            newState.age = state.age + 1;
            return newState;
        case 'INCREMENT-CHILDREN-COUNT':
            // let newStateChild = {...state}
            // newStateChild.childrenCount = state.childrenCount + 1;
            // return newStateChild;

            return {

                ...state,
                childrenCount: state.childrenCount + 1
            }
        case 'CHANGE-NAME':
            return {
                ...state,
                name: action.newName
            }
        default:
            throw new Error('Error')
    }
}