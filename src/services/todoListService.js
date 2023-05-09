import { uuid } from 'vue-uuid'; 

import { request } from "@/services/httpClient";

export const getTodoList = async () => {
    const response = await request("GET", "/todo-list");
    return response.body;
}

export const getTodoListItems = async (todoListId) => {
    const response = await request("GET", `/todo-list/${todoListId}`);
    return response.body.items;
}

export const addTodoList = async (newTodoList) => {
    // TODO should be done by the BE
    const toAdd = JSON.parse(JSON.stringify(newTodoList));
    toAdd.id = uuid.v4();
    toAdd.creationDate = new Date();
    toAdd.items = [];

    const response = await request("POST", "/todo-list", undefined, {body: toAdd});
    return response.body;
}

export const addTodoItem = async (todoListId, newTodoItem) => {
    // TODO should be done by the BE
    const toAdd = JSON.parse(JSON.stringify(newTodoItem));
    toAdd.id = uuid.v4();

    const response = await request("POST", `/todo-list/${todoListId}/items`, undefined, {body: toAdd});
    return response.body;
}

export const editTodoItem = async (todoListId, newTodoItem) => {
    // TODO should be done by the BE
    const toAdd = JSON.parse(JSON.stringify(newTodoItem));
    toAdd.id = uuid.v4();

    const response = await request("PUT", `/todo-list/${todoListId}/items`, undefined, {body: toAdd});
    return response.body;
}

export const deleteTodoItem = async (todoListId, todoItemId) => {
    const response = await request("DELETE", `/todo-list/${todoListId}/items/${todoItemId}`, undefined, {});
    return response.body;
}
