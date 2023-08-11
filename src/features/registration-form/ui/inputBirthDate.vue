<template>
    <q-input
        label="Дата рождения"
        outlined
        clearable
        stack-label
        color="accent"
        reactive-rules
        v-model="date"
        @update:model-value="updateDate"
        mask="date"
        :rules="[isValidDate, (val, rules) => rules.date(val) || 'Некорректная дата']"
        class="signup-form__input text-body1"
    >
        <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date color="positive" v-model="date">
                        <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" flat />
                        </div>
                    </q-date>
                </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { isValidDate } from '../lib/isValidDate';

const date = ref('');

const emit = defineEmits(['update:date']);

const updateDate = (value: string | number | null): void => {
    if (value && typeof value === 'string') emit('update:date', value);
};

defineComponent({
    name: 'InputBirthDate',
});
</script>

<style lang="scss" scoped></style>
