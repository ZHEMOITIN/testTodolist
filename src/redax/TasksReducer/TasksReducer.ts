import {todolistID1, todolistID2} from "../TodolistReducer/TodolistReducer";
import {v1} from "uuid";


export type TasksTypeElements = {
    id: string,
    title: string
    isDone: boolean
}
export type TasksType = {
    [key: string]: Array<TasksTypeElements>
}
let initialState: TasksType = {
    [todolistID1]: [
        {id: v1(), title: 'Молоко', isDone: false},
        {id: v1(), title: 'Хлеб', isDone: false},
        {id: v1(), title: 'Мука', isDone: true},
        {id: v1(), title: 'Картофель', isDone: true},
        {id: v1(), title: 'Масло', isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'TS', isDone: true},
        {id: v1(), title: 'ReactTS', isDone: false},
        {id: v1(), title: 'Redax', isDone: false},
    ]
}

type actionType = ReturnType<typeof changeStatusTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addNewListTaskAC>
    | ReturnType<typeof addNewTaskAC>;

export const TasksReducer = (state = initialState, action: actionType) => {
    switch (action.type) {
        case 'CHANGE-STATUS-TASK': {
            return {
                ...state,
                [action.todoID]: state[action.todoID].map(t => t.id === action.taskID ? {
                    ...t,
                    isDone: action.conditionTask
                } : t)
            }
        }
        case 'REMOVE-TASK': {
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)}
        }
        case 'ADD-LIST-TASKS': {
            return {...state, [action.todolistID]: []};
        }
        case 'ADD-NEW-TASK': {
            let newTask: TasksTypeElements = {id: v1(), title: action.titleTask, isDone: false};
            return {...state, [action.todolistID]: [newTask, ...state[action.todolistID]]};
        }
        default: {
            return state;
        }
    }
}


export const changeStatusTaskAC = (todoID: string, taskID: string, conditionTask: boolean) => {
    return {
        type: 'CHANGE-STATUS-TASK',
        todoID,
        taskID,
        conditionTask
    } as const
};

export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        todolistID,
        taskID
    } as const
};

export const addNewListTaskAC = (todolistID: string) => {
    return {
        type: 'ADD-LIST-TASKS',
        todolistID,
    } as const
}

export const addNewTaskAC = (todolistID: string, titleTask: string) => {
    return {
        type: 'ADD-NEW-TASK',
        todolistID,
        titleTask,
    } as const
}