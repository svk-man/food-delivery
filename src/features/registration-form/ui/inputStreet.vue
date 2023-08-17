<template>
    <q-input
        label="Улица*"
        outlined
        clearable
        stack-label
        color="accent"
        reactive-rules
        v-model="userStreet"
        @update:model-value="updateCity"
        :rules="[(val) => (val && val.length) || 'Обязательное поле']"
        class="signup-form__input text-body1"
    />
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue';

const userStreet = ref('');

const emit = defineEmits(['update:street']);

const updateCity = (value: string | number | null): void => {
    if (value && typeof value === 'string') emit('update:street', value);
};

defineComponent({
    name: 'InputStreet',
});
</script>
