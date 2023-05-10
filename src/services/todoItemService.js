import { uuid } from 'vue-uuid'; 

import { request } from "@/services/httpClient";

export const getTodoListItems = async (todoListId) => {
    const response = await request("GET", `/todo-list/${todoListId}`);
    return response.body.items;
}

export const addTodoItem = async (todoListId, newTodoItem) => {
    // TODO should be done by the BE
    const toAdd = JSON.parse(JSON.stringify(newTodoItem));
    toAdd.id = uuid.v4();
    const existed = await request("GET", `/todo-list/${todoListId}`)
    existed.body.items.push(toAdd);
    await request("PUT", `/todo-list/${todoListId}`, undefined, {body: existed.body});
    return toAdd;
}

export const editTodoItem = async (todoListId, newTodoItem) => {
    const existed = await request("GET", `/todo-list/${todoListId}`)
    const index = existed.body.items.findIndex(item => item.id === newTodoItem.id);
    if(index > -1) {
        existed.body.items[index] = newTodoItem;
        await request("PUT", `/todo-list/${todoListId}`, undefined, {body: existed.body});
    }
    return newTodoItem;
}

export const deleteTodoItem = async (todoListId, todoItemId) => {
    const existed = await request("GET", `/todo-list/${todoListId}`)
    const index = existed.body.items.findIndex(item => item.id === todoItemId);
    if(index > -1) {
        existed.body.items.splice(index, 1);
        await request("PUT", `/todo-list/${todoListId}`, undefined, {body: existed.body});
    }
}
