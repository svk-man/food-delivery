<template>
    <div class="signup-form__name">
        <q-input
            label="Имя"
            outlined
            clearable
            stack-label
            color="accent"
            reactive-rules
            v-model="userFirstName"
            @update:model-value="updateFirstName"
            :rules="[isValidName]"
            class="signup-form__input text-body1"
        />
        <q-input
            label="Фамилия"
            outlined
            clearable
            stack-label
            color="accent"
            reactive-rules
            v-model="userLastName"
            @update:model-value="updateLastName"
            :rules="[isValidName]"
            class="signup-form__input text-body1"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue';
import { isValidName } from '../lib/isValidName';

const userFirstName = ref('');
const userLastName = ref('');

const emit = defineEmits(['update:first-name', 'update:last-name']);

const updateFirstName = (value: string | number | null): void => {
    if (value && typeof value === 'string') emit('update:first-name', value);
};
const updateLastName = (value: string | number | null): void => {
    if (value && typeof value === 'string') emit('update:last-name', value);
};

defineComponent({
    name: 'InputName',
});
</script>

<style lang="scss" scoped>
.signup-form {
    &__name {
        display: flex;
        justify-content: space-between;
        gap: 12px;
    }
    &__input {
        width: 50%;
    }
}
</style>
