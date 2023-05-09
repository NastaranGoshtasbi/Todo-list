<template>
    <div class="main">
        <TodoListsTable />
    </div>
</template>

<script>

import TodoListsTable from '../components/TodoListsTable.vue'

export default {

    components : {
        TodoListsTable
    }

}
</script>

<style>

.main {
    width: 90%;
    position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

</style>