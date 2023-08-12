<template>
    <q-input
        label="Индекс"
        outlined
        clearable
        stack-label
        color="accent"
        reactive-rules
        v-model="userPostalCode"
        class="signup-form__input text-body1"
    />
    <!-- @update:model-value="updateEmail" -->
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';

const userPostalCode = ref('');

defineComponent({
    name: 'InputPostalCode',
});
</script>

<style scoped></style>
