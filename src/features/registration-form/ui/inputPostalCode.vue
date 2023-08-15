<template>
    <q-input
        label="Индекс"
        outlined
        clearable
        stack-label
        color="accent"
        reactive-rules
        v-model="userPostalCode"
        class="signup-form__input postal-code-input text-body1"
    />
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';

const userPostalCode = ref('');

defineComponent({
    name: 'InputPostalCode',
});
</script>

<style scoped>
.postal-code-input {
    margin-top: 20px;
}
</style>
