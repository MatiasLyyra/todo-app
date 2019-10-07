import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nextId: 0,
    todos: [],
  },
  mutations: {
    toggleTodo({ todos }, todo) {
      todos[todo.id].done = !todos[todo.id].done;
    },
    addTodo({ todos }, todo) {
      todos.push(todo);
    },
    incrementId(state) {
      state.nextId++;
    },
    changeTodoName(state, todo) {
      Vue.set(state.todos, todo.id, todo);
    },
  },
  actions: {
    toggleTodo({ commit }, todo) {
      commit("toggleTodo", todo);
    },
    addTodo({ commit, state }, todo) {
      const newTodo = Object.assign(
        {
          id: state.nextId,
        },
        todo
      );
      commit("incrementId");
      commit("addTodo", newTodo);
    },
    changeTodoName({ commit }, todo) {
      console.log(todo);
      commit("changeTodoName", todo);
    },
  },
});
