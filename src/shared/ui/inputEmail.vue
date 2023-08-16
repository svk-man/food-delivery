<template>
    <q-input
        label="Email"
        outlined
        clearable
        stack-label
        color="accent"
        reactive-rules
        v-model="userEmail"
        @update:model-value="updateEmail"
        :rules="[
            (val) => (val && val.length) || 'Обязательное поле',
            (val, rules) => rules.email(val) || 'Некорректный Email',
        ]"
        class="text-body1"
    />
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue';

const userEmail = ref('');

const emit = defineEmits(['update:email']);

const updateEmail = (value: string | number | null): void => {
    if (value && typeof value === 'string') emit('update:email', value);
};

defineComponent({
    name: 'InputEmail',
});
</script>
