import {v1} from "uuid";

export const todolistID1 = v1();
export const todolistID2 = v1();

export type FilterTodoType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string, title: string, filter: FilterTodoType
}
let initialState: TodolistType[] = [
    {id: todolistID1, title: 'Купить', filter: 'all'},
    {id: todolistID2, title: 'Выучить', filter: 'all'},
];

type actionType = ReturnType<typeof addNewTodolistAC> | ReturnType<typeof changeFilterTodolistAC>;


export const TodolistReducer = (state = initialState, action: actionType) => {
    switch (action.type) {
        case 'ADD-NEW-TODOLIST': {
            return [{id: action.todoID, title: action.title, filter: 'all'}, ...state];
        }
        case 'CHANGE-FILTER-TODOLIST': {
            return state.map(t => t.id === action.todoID ? {...t, filter: action.valueIsDone}: t);
        }
        default: {
            return state;
        }
    }
}


export const addNewTodolistAC = (todoID: string, title: string) => {
    return {
        type: 'ADD-NEW-TODOLIST',
        todoID,
        title
    } as const
}

export const changeFilterTodolistAC = (todoID: string, valueIsDone: FilterTodoType) => {
    return {
        type: 'CHANGE-FILTER-TODOLIST',
        todoID,
        valueIsDone
    } as const
}