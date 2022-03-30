<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo" />
      <List :todos="todos" :deleteTodo="deleteTodo" :updateTodo="updateTodo" />
      <Footer
        :todos="todos"
        :checkAll="checkAll"
        :clearAllCompletedTodos="clearAllCompletedTodos"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import List from "./components/List.vue";

// 引入接口
import { Todo } from "./type/Todo";
export default defineComponent({
  name: "App",
  components: {
    Header,
    Footer,
    List,
  },

  // 数据应该用数组来存储，数组中的每个数据都是一个对象，对象中应该有三个属性(id, title, isCompleted)
  // 把数组暂且定义在App.vue父级组件

  setup() {
    // 定义一个数组数据
    const state = reactive<{ todos: Todo[] }>({
      todos: [
        {
          id: 1,
          title: "玛莎拉蒂",
          isCompleted: false,
        },
        {
          id: 2,
          title: "benz",
          isCompleted: true,
        },
        {
          id: 3,
          title: "宝马",
          isCompleted: true,
        },
      ],
    });

    //  添加数据的方法
    const addTodo = (todo: Todo) => {
      state.todos.unshift(todo);
    };

    // 删除数据的方法
    const deleteTodo = (index: number) => {
      state.todos.splice(index, 1);
    };

    watch(
      state,
      () => {
        // console.log(state);
      },
      { deep: true, immediate: true }
    );

    const updateTodo = (todo: Todo, isCompleted: boolean) => {
      todo.isCompleted = isCompleted;
    };

    const checkAll = (isCompleted: boolean) => {
      state.todos.forEach((item) => (item.isCompleted = isCompleted));
    };

    // 清理所有选中的数据
    const clearAllCompletedTodos = () => {
      // const arr = state.todos
      // for (let i = arr.length - 1; i > -1; i -= 1) {
      //   if (arr[i].isCompleted) {
      //     arr.splice(i, 1)
      //   }
      // }

      // 更好的方法
      state.todos = state.todos.filter((todo) => !todo.isCompleted);
    };

    // const text: any = reactive({});
    // // const p: string = '18';
    // const p: number = 18;
    // text[p] = 12;
    // text.aaa = '12';
    // // text.aa = 12;
    // console.log(text);
    

    return {
      ...toRefs(state),
      addTodo,
      deleteTodo,
      updateTodo,
      checkAll,
      clearAllCompletedTodos,
    };
  },
});
</script>

<style scoped>
/* app */
.todo-container {
  width: 600px;
  margin: 0 auto;
}

.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>