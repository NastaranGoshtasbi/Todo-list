import { BASE_URL } from "@/types/constants";
import { uuid } from 'vue-uuid'; 

// TODO centralize/generic http requests

export const getTodoList = async () => {
    const response = await fetch(`${BASE_URL}/todo-list`);
    const data = await response.json();
    return data;
}

export const getTodoListItems = async (todoListId) => {
    const response = await fetch(`${BASE_URL}/todo-list/${todoListId}`);
    const data = await response.json();
    return data.items;
}

export const addTodoList = async (newTodoList) => {
    // TODO should be done by the BE
    newTodoList.id = uuid.v4();
    newTodoList.creattionDate = new Date();

    const response = await fetch(`${BASE_URL}/todo-list`, {
        method: "POST", 
        body: JSON.stringify(newTodoList),
      });
    return response;
}

export const addTodoListItems = async (newTodoList) => {
    // TODO should be done by the BE
    newTodoList.id = uuid.v4();
    newTodoList.dueDate = new Date();

    const response = await fetch(`${BASE_URL}/todo-list`, {
        method: "POST", 
        body: JSON.stringify(newTodoList),
      });
    return response;
}