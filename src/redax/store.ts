import {combineReducers, createStore} from "redux";
import {TodolistReducer} from "./TodolistReducer/TodolistReducer";
import {TasksReducer} from "./TasksReducer/TasksReducer";

export const rootReducer = combineReducers({
    todolist: TodolistReducer,
    tasks: TasksReducer
});

export type rootReducerType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
