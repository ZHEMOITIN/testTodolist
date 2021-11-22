import {
    addNewTodolistAC,
    changeFilterTodolistAC,
    FilterTodoType,
    TodolistReducer,
    TodolistType
} from "./TodolistReducer";
import {v1} from "uuid";
import {TasksReducer} from "../TasksReducer/TasksReducer";

test('correct todolist should be added',() => {

    let todolistID1 = v1();
    let todolistID2 = v1();
    let newTodolistID = v1();
    let title = 'Задачи на завтра'

    let startState: TodolistType[] = [
        {id: todolistID1, title: 'Купить', filter: 'all'},
        {id: todolistID2, title: 'Выучить', filter: 'all'},
    ];

    let endState = TodolistReducer(startState, addNewTodolistAC(newTodolistID, title));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('Задачи на завтра');
    expect(endState[1].id).toBe(todolistID1);
});

test('correct filter todolist should be changed', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let filter: FilterTodoType = 'active'

    let startState: TodolistType[] = [
        {id: todolistID1, title: 'Купить', filter: 'all'},
        {id: todolistID2, title: 'Выучить', filter: 'all'},
    ];

    let endState = TodolistReducer(startState, changeFilterTodolistAC(todolistID1, filter));

    expect(endState[0].filter).toBe('active');
    expect(endState[1].filter).toBe('all');
});

