<template>
  <h2>Child子级组件</h2>
  <h3>age: {{ age }}</h3>
  <h3>length: {{ length }}</h3>
</template>

<script lang="ts">
import { defineComponent, Ref, toRef, computed } from 'vue';

function useGetLength(age: Ref) {
    // 这里还需要注意使用计算属性，来实时监视age的变化
    return computed(() => {
        return age.value.toString().length;
    })
}

export default defineComponent({
    name: 'Child',
    props: {
        age: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        // 这个useGetLength是 hook函数，方便，写在这里
        // 这里应该用到props里面的age，但是setup里面不能写其他地方的this
        // 所以使用setup的props的参数
        const length = useGetLength(toRef(props, 'age'));

        return {
            length,
        }
    }
});
</script>

<style>
</style>