<template>
  <li
    @mouseenter="mouseHandler(true)"
    @mouseleave="mouseHandler(false)"
    :style="{ backgroundColor: bgColor, color: myColor }"
  >
    <label>
      <!-- <input type="checkbox" v-model="todo.isCompleted" /> -->
      <!--       <input
        type="checkbox"
        :checked="todo.isCompleted"
        v-model="isCompleted"
      /> -->
      <!-- 但是不报错, 但是没有初始化效果 -->
      <!-- <input type="checkbox" :value="todo.isCompleted" /> -->
      <!-- v-model改为 :checked -->
      <!-- 注意，目前这种情况，此组件修改了复选框的内容，父组件的对象的属性，实际上是不会改变的，也就是不是响应式的数据 -->
      <!-- <input type="checkbox" :checked="todo.isCompleted" /> -->
      <!-- 需要使用computed计算属性来控制check状态 -->
      <!-- <input type="checkbox" :checked="isComplete" /> -->
      <!-- 但是写完computed之后，上面的 :checked 写法只会进入get，但是无法进入set -->
      <!-- 所以改成了下面的这种，这个时候用v-model就可以了，为什么不能用props就不清楚了 -->
      <input
        type="checkbox"
        v-model="isComplete"
      />
      <span>{{ todo.title }}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="delTodo">
      删除
    </button>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

import { Todo } from "../type/Todo";
export default defineComponent({
  name: "Item",
  props: {
    // todo: Object as () => Todo, // 函数返回的是Todo类型
    todo: {
      type: Object as () => Todo,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    deleteTodo: {
      type: Function,
      required: true,
    },
    updateTodo: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    // 背景色
    const bgColor = ref("white");
    // 前景色
    const myColor = ref("black");
    // 设置按钮默认不显示
    const isShow = ref(false);

    // 鼠标进入和离开事件的回调
    const mouseHandler = (flag: boolean) => {
      if (flag) {
        // 进入
        bgColor.value = "pink";
        myColor.value = "green";
        isShow.value = true;
      } else {
        // 离开
        bgColor.value = "white";
        myColor.value = "black";
        isShow.value = false;
      }
    };

    const delTodo = () => {
      if (window.confirm("确定删除数据吗？")) {
        props.deleteTodo(props.index);
      }
    };

    // 问题，这里的computed为什么是传入对象
    const isComplete = computed({
      get() {
        return props.todo.isCompleted;
      },
      set(val) {
        props.updateTodo(props.todo, val);
      },
    });

    return {
      bgColor,
      myColor,
      isShow,
      mouseHandler,
      delTodo,
      isComplete,
    };
  },
});
</script>

<style scoped>
/* item */
li {
  list-style: none;
  height: 38px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

/* 有些莫名其妙，明明一个hover样式就能搞定，为什么还要用代码写 */
/* li:hover {
  background-color: pink;
  color: green;
} */

li label {
  float: left;
  cursor: pointer;
}

li babel li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  /* display: none; */
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>