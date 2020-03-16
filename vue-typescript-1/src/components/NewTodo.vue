<template>
    <div>
        <input type="text" v-model="text">
        <button @click="handleAdd">添加</button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Todo } from '../utils/interface';

@Component
export default class NewTodo extends Vue {

    text = ''  

    handleAdd() {
        let todo: Todo = {
            name: this.text,
            state: 'todo'
        }
        this.$emit('addTodo', todo)        
    }
}
</script>