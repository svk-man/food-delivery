<template>
    <q-input
        label="Email"
        outlined
        clearable
        stack-label
        color="accent"
        lazy-rules="ondemand"
        v-model="userEmail"
        @update:model-value="updateEmail"
        :rules="[(val, rules) => rules.email(val) || 'Некорректный Email']"
        class="signup-form__input text-body1"
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
