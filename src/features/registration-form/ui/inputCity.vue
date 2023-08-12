<template>
    <q-input
        label="Город"
        outlined
        clearable
        stack-label
        color="accent"
        reactive-rules
        v-model="userCity"
        @update:model-value="updateCity"
        :rules="[isValidName]"
        class="signup-form__input text-body1"
    />
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue';
import { isValidName } from '../lib/isValidName';

const userCity = ref('');

const emit = defineEmits(['update:city']);

const updateCity = (value: string | number | null): void => {
    if (value && typeof value === 'string') emit('update:city', value);
};

defineComponent({
    name: 'InputCity',
});
</script>
