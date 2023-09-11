<template>
    <q-input
        :label="lastNameLabel ? lastNameLabel : 'Фамилия *'"
        :clearable="false"
        outlined
        stack-label
        color="accent"
        reactive-rules
        v-model="userLastName"
        @update:model-value="updateLastName"
        :rules="[isValidName]"
        class="signup-form__input text-body1"
    />
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue';
import { isValidName } from '../lib/isValidName';

const userLastName = ref('');

const emit = defineEmits(['update:last-name']);

const updateLastName = (value: string | number | null): void => {
    if (value && typeof value === 'string') emit('update:last-name', value);
};

defineComponent({
    name: 'InputName',
});
defineProps({
    lastNameLabel: String,
});
</script>

<style lang="scss" scoped></style>
