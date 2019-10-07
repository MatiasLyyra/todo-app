<template>
  <div class="todo" :class="{ completed: todo.done }">
    <div class="complete-mark">️✔️</div>
    <div class="incomplete-mark">❌</div>
    <input
      ref="todoName"
      type="text"
      :disabled="!editable"
      name="todo-name"
      class="todo-name"
      :value="todo.name"
      @click="prevent($event)"
      @keydown.enter="stopAndPrevent($event)"
      @blur="stopEditing($event)"
    />
    <button
      @click.stop="allowEdit"
      @keydown.enter.stop="allowEdit"
      name="edit"
      class="btn"
      tabindex="0"
    >
      Edit
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editable: false,
    };
  },
  props: {
    todo: { type: Object, required: true },
    contentChanged: { type: Function, default: () => () => {} },
  },
  methods: {
    allowEdit() {
      this.editable = true;
      requestAnimationFrame(() => {
        this.$refs.todoName.focus();
      });
    },
    stopEditing(event) {
      this.editable = false;
      const newTodo = Object.assign({}, this.todo);
      newTodo.name = event.target.value;
      console.log(event.target.value);
      this.contentChanged(newTodo);
    },
    prevent(event) {
      if (this.editable) {
        event.stopPropagation();
      }
    },
    stopAndPrevent(event) {
      this.prevent(event);
      this.stopEditing(event);
    },
  },
};
</script>
<style lang="scss" scoped>
.todo {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  flex-direction: row;
  & > * {
    flex: 0 1 auto;
    width: unset !important;
  }
  & > .todo-name {
    flex: 1 1 auto;
    margin: 0 2rem;
    &:disabled {
      color: black;
      border-bottom: none;
    }
  }
  .complete-mark,
  .incomplete-mark {
    position: relative;
    // top: 0.5rem;
    // margin-right: 0.5rem;
    font-size: 2rem;
    display: none;
  }
  &.completed .complete-mark {
    display: block;
  }
  &:not(.completed) .incomplete-mark {
    display: block;
  }

  .btn {
    display: inline-block;
  }
}
</style>
