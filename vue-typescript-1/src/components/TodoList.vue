<template>
    <ul>
        <li v-for="(todo, index) in list" :key="index">
            {{todo.name}}
        </li>
    </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Todo } from '../utils/interface'

@Component
export default class TodoList extends Vue {  
    @Prop() private list!: Array<Todo>;
}
</script>