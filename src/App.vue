<template>
  <div id="app">
    <section class="todoapp">
      <TodoHeader></TodoHeader>
      <TodoMain></TodoMain>
    </section>
    <TodoFooter></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from "./components/header.vue";
import TodoMain from "./components/todo.vue";
import TodoFooter from "./components/footer.vue";

export default {
  name: "App",
  components: {
    TodoHeader,
    TodoMain,
    TodoFooter
  }
};
</script>

<style lang="scss">
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
</style>
