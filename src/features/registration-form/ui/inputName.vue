<template>
    <q-input
        :label="firstNameLabel ? firstNameLabel : 'Имя *'"
        :clearable="false"
        outlined
        stack-label
        color="accent"
        reactive-rules
        v-model="userFirstName"
        @update:model-value="updateFirstName"
        :rules="[isValidName]"
        class="signup-form__input text-body1"
    />
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue';
import { isValidName } from '../lib/isValidName';

const userFirstName = ref('');

const emit = defineEmits(['update:first-name']);

const updateFirstName = (value: string | number | null): void => {
    if (value && typeof value === 'string') emit('update:first-name', value);
};

defineComponent({
    name: 'InputName',
});
defineProps({
    firstNameLabel: String,
});
</script>
