import {todolistID1, todolistID2} from "../TodolistReducer/TodolistReducer";
import {v1} from "uuid";
import {
    addNewListTaskAC,
    addNewTaskAC,
    changeStatusTaskAC,
    removeTaskAC,
    TasksReducer,
    TasksType
} from "./TasksReducer";


test('correct todolist should be filtered', () => {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let startState: TasksType = {
        [todolistID1]: [
            {id: v1(), title: 'Молоко', isDone: false},
            {id: v1(), title: 'Хлеб', isDone: false},
            {id: v1(), title: 'Мука', isDone: true},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
    }

    const filteredTasks = (todoID: string, valueIsDone: string) => {
        let res = startState;
        if (valueIsDone === 'active') {
            return {...res, [todoID]: res[todoID].filter(t => !t.isDone)};
        }
        else if (valueIsDone === 'completed') {
            return {...res, [todoID]: res[todoID].filter(t => t.isDone)};
        }
        else {
            return res;
        }
    }

    let endState = filteredTasks(todolistID2, 'active');

    expect(endState[todolistID1].length).toBe(3);
    expect(endState[todolistID2].length).toBe(2);
});

test('correct task should be edit status', () => {

    let startState: TasksType = {
        [todolistID1]: [
            {id: v1(), title: 'Молоко', isDone: false},
            {id: v1(), title: 'Хлеб', isDone: false},
            {id: v1(), title: 'Мука', isDone: true},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
    }

    let action = changeStatusTaskAC(todolistID1, startState[todolistID1][1].id, true);

    let endState = TasksReducer(startState, action);

    expect(endState[todolistID1][1].isDone).toBeTruthy();
    expect(endState[todolistID1][0].isDone).toBeFalsy();

});

test('correct tasks should be removed', () => {
    let startState: TasksType = {
        [todolistID1]: [
            {id: v1(), title: 'Молоко', isDone: false},
            {id: v1(), title: 'Хлеб', isDone: false},
            {id: v1(), title: 'Мука', isDone: true},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
    }

    let endState = TasksReducer(startState, removeTaskAC(todolistID1, startState[todolistID1][1].id));

    expect(endState[todolistID1].length).toBe(2);
    expect(endState[todolistID2].length).toBe(4);
});

test('new todolist should be added in obj tasksData', () => {
    const todolistID = v1();

    let startState: TasksType = {
        [todolistID1]: [
            {id: v1(), title: 'Молоко', isDone: false},
            {id: v1(), title: 'Хлеб', isDone: false},
            {id: v1(), title: 'Мука', isDone: true},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
    }

    let endState = TasksReducer(startState, addNewListTaskAC(todolistID));

    expect(endState[todolistID].length).toBe(0);
    expect(endState[todolistID1].length).toBe(3);
    expect(endState[todolistID2].length).toBe(4);
});

test('correct task should be added', () => {
    const testTaskTitle = 'Яйца';

    let startState: TasksType = {
        [todolistID1]: [
            {id: v1(), title: 'Молоко', isDone: false},
            {id: v1(), title: 'Хлеб', isDone: false},
            {id: v1(), title: 'Мука', isDone: true},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
    }

    const action = addNewTaskAC(todolistID1, testTaskTitle);

    let endState = TasksReducer(startState, action);

    expect(endState[todolistID1][0].title).toBe(testTaskTitle);
});