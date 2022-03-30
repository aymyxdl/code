<template>
    <h2>AsyncAddress组件</h2>
    <h3>{{ data }}</h3>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// 引入axois
import axios from 'axios';

export default defineComponent({
    name: 'AsyncAddress',
    // setup() {
    //     return axios.get('./data/address.json').then(response => {
    //         return {
    //             data: response.data
    //         }
    //     })
    // },

    // 或者使用 async await

    async setup() {
        const result = await axios.get('/data/address.json');
        return {
            data: result.data
        }
    }
});
</script>

<style>
</style>