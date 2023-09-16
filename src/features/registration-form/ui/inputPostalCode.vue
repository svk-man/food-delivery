<template>
    <q-input
        label="Индекс*"
        outlined
        clearable
        stack-label
        color="accent"
        reactive-rules
        v-model="userPostalCode"
        @update:model-value="updatePostal"
        class="signup-form__input postal-code-input text-body1"
    />
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';

const userPostalCode = ref('');

const emit = defineEmits(['update:postal']);

const updatePostal = (value: string | null): void => {
    if (value && typeof value === 'string') emit('update:postal', value);
};
defineComponent({
    name: 'InputPostalCode',
});
</script>

<style scoped>
.postal-code-input {
    margin-top: 20px;
}
</style>
