import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./redax/store";
import {
    addNewTodolistAC,
    changeFilterTodolistAC,
    FilterTodoType, todolistID1,
    TodolistType
} from "./redax/TodolistReducer/TodolistReducer";
import {
    addNewListTaskAC,
    addNewTaskAC,
    changeStatusTaskAC,
    removeTaskAC,
    TasksType
} from "./redax/TasksReducer/TasksReducer";
import {v1} from "uuid";

function App() {

    let [mainTodoTitle, setMainTodoTitle] = useState('');

    const dispatch = useDispatch();
    let todolistData = useSelector<rootReducerType, Array<TodolistType>>(state => state.todolist);
    let tasksData = useSelector<rootReducerType, TasksType>(state => state.tasks);

    const ChangeTitleTodolist = (e: ChangeEvent<HTMLInputElement>) => {
        setMainTodoTitle(e.currentTarget.value);
    }
    const addNewTodolist = () => {
        let todoID = v1();
        dispatch(addNewTodolistAC(todoID, mainTodoTitle));
        dispatch(addNewListTaskAC(todoID));
    }

    const changeFilterTodolist = (todolistID: string, valueIsDone: FilterTodoType) => {
        dispatch(changeFilterTodolistAC(todolistID, valueIsDone));
    }

    const changeStatusTask = (todolistID: string, taskID: string, conditionTask: boolean) => {
        dispatch(changeStatusTaskAC(todolistID, taskID, conditionTask));
    }

    const removeTasks = (todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID));

    }

    const addNewTask = (todolistID: string, titleTask: string) => {
        dispatch(addNewTaskAC(todolistID, titleTask));
    }


    return (
        <div className="App">
            <div className={'container'}>
                <div>
                    <input type="text"
                           placeholder={'Новый список дел'}
                           onChange={ChangeTitleTodolist}
                           value={mainTodoTitle}
                    />
                    <button onClick={addNewTodolist}>+</button>
                </div>
                <div className={'todolistWrapper'}>
                    {todolistData.map(tl => {
                        let copyTodolist = tasksData[tl.id];
                        if (tl.filter === 'active') copyTodolist = copyTodolist.filter(t => !t.isDone);
                        if (tl.filter === 'completed') copyTodolist = copyTodolist.filter(t => t.isDone);
                        return (
                            <Todolist
                                key={tl.id}
                                tasks={copyTodolist}
                                todolistID={tl.id}
                                todolistTitle={tl.title}
                                changeFilterTodolist={changeFilterTodolist}
                                changeStatusTask={changeStatusTask}
                                removeTasks={removeTasks}
                                addNewTask={addNewTask}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
