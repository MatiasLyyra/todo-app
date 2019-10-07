<template>
  <div class="home">
    <h1>Todo app</h1>
    <section class="todos">
      <div
        class="todo-row"
        v-for="todo in todos"
        :key="todo.id"
        @click="toggle(todo)"
        @keydown.enter="toggle(todo)"
        tabindex="0"
      >
        <Todo :todo="todo" :contentChanged="changeTodo"></Todo>
      </div>
    </section>
    <form class="todo-form" @submit.prevent="addTodo">
      <input
        type="text"
        name="todo-name"
        v-model.trim="todoName"
        placeholder="Add new todo..."
      />
      <button type="submit" class="btn">Add</button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Todo from "@/components/Todo";
export default {
  data() {
    return {
      todoName: "",
    };
  },
  components: { Todo },
  computed: {
    ...mapState({
      todos: state => state.todos,
    }),
  },
  methods: {
    addTodo() {
      if (this.todoName !== "") {
        this.$store.dispatch("addTodo", {
          name: this.todoName,
          done: false,
        });
        this.todoName = "";
      }
    },
    toggle(todo) {
      this.$store.dispatch("toggleTodo", todo);
    },
    changeTodo(todo) {
      if (todo.name.trim() !== "") {
        this.$store.dispatch("changeTodoName", todo);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.todos .todo-row {
  cursor: pointer;
}
</style>
