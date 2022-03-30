<template>
    <h2>AsyncComponent组件</h2>
    <h3>msg: {{ msg }}</h3>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AsyncComponent',
    setup() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    msg: 'who are u'
                })
            }, 3000)
        });

        // return {}
    }
});
</script>

<style>
</style>