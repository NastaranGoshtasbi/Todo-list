<template>
    <div class="main">
        <TodoDetails />
    </div>
</template>

<script>

import TodoDetails from '../components/TodoDetails.vue'

export default {

    components : {
        TodoDetails
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