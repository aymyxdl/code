<template>
  <modal-button />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ModalButton from './ModalButton.vue';

export default defineComponent({
  name: "App",
  components: {
    ModalButton,
  }
});
</script>

<style>
</style>