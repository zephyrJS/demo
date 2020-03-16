<template>
  <div id="app">
    <new-todo @addTodo="handleAdd"></new-todo>
    <todo-list :list="list"></todo-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NewTodo from './components/NewTodo.vue'
import TodoList from './components/TodoList.vue'
import { Todo } from './utils/interface'

@Component({
  components: {
    NewTodo,
    TodoList
  },
})
export default class App extends Vue {
  list:Array<Todo> = []

  handleAdd(todo: Todo) {
    this.list.push(todo)
  }
}
</script>

<style lang="scss">

</style>
