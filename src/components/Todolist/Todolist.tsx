import React, {ChangeEvent, useState} from "react";
import s from './Todolist.module.css';
import {TasksType, TasksTypeElements} from "../../redax/TasksReducer/TasksReducer";
import {FilterTodoType} from "../../redax/TodolistReducer/TodolistReducer";

type TodolistPropsType = {
    tasks: Array<TasksTypeElements>
    todolistID: string
    todolistTitle: string
    changeFilterTodolist: (todolistID: string, valueIsDone: FilterTodoType) => void
    changeStatusTask: (todolistID: string, taskID: string, conditionTask: boolean) => void
    removeTasks: (todolistID: string, taskID: string) => void
    addNewTask: (todolistID: string, titleTask: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (
    {
        tasks, todolistID, todolistTitle,
        changeFilterTodolist, changeStatusTask, removeTasks, addNewTask
    }) => {

    let [textInputForTask, setTextInputForTask] = useState('');

    const changeFilterTodolistHandler = (value: FilterTodoType) => {
        changeFilterTodolist(todolistID, value);
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, taskID: string) => {
        changeStatusTask(todolistID, taskID, e.currentTarget.checked);
    }

    const removeTasksHandler = (taskID: string) => {
        removeTasks(todolistID, taskID);
    }

    const changeTextInputForTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTextInputForTask(e.currentTarget.value);
    }
    const addNewTaskHandler = () => {
        addNewTask(todolistID, textInputForTask);
        setTextInputForTask('');
    }

    return (
        <div className={'todolist'}>
            <div>
                <span>{todolistTitle}</span>
            </div>
            <div>
                <input type="text"
                       placeholder={'Чем бы Вы хотели заняться?'}
                       value={textInputForTask}
                       onChange={changeTextInputForTaskHandler}
                />
                <button onClick={addNewTaskHandler}>+</button>
            </div>
            <ul>
                {tasks.map(t => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone} onChange={e => changeTaskStatusHandler(e, t.id)}/>
                            <span>{t.title}</span>
                            <button onClick={() => {
                                removeTasksHandler(t.id)
                            }}>X
                            </button>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button onClick={() => changeFilterTodolistHandler('all')}>all</button>
                <button onClick={() => changeFilterTodolistHandler('active')}>active</button>
                <button onClick={() => changeFilterTodolistHandler('completed')}>completed</button>
            </div>
        </div>
    );
}