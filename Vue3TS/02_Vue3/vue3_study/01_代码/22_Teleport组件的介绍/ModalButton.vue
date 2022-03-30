<template>
    <button @click="modalOpen = true">open</button>
    <!-- 打开对话框 -->
    <!-- <div v-if="modalOpen">
        <div>here is a dialog</div>
        <button @click="modalOpen = false">close</button>
    </div> -->

    <!-- 使用了 teleport 标签后，下面的这个对话框，就不再是默认的层级中了
    会放到body下面，和 #app 标签同级 -->
    <teleport to='body'>
        <div v-if="modalOpen">
            <div>here is a dialog</div>
            <button @click="modalOpen = false">close</button>
        </div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'ModalButton',
    setup() {
        const modalOpen = ref(false);
        return {
            modalOpen,
        }
    }
});
</script>

<style>
</style>