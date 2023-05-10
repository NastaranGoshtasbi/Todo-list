import { uuid } from 'vue-uuid'; 

import { request } from "@/services/httpClient";

export const getTodoList = async () => {
    const response = await request("GET", "/todo-list");
    return response.body;
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