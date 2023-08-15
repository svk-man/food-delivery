<template>
    <q-select
        label="Страна"
        stack-label
        outlined
        color="accent"
        use-input
        hide-selected
        fill-input
        v-model="selectedCountry"
        @update:model-value="updateCountry"
        input-debounce="0"
        :options="options"
        option-label="name"
        @input-value="setSelectedCountry"
        @filter="filterSelect"
        class="signup-form__input text-body1"
    >
        <template v-slot:no-option>
            <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
        </template>
    </q-select>
</template>

<script setup lang="ts">
import countryData from 'src/shared/data/countryList.json';
import { Ref, defineComponent, ref } from 'vue';
import { Country } from '../lib/types';

const options: Ref<Country[]> = ref(countryData);
const selectedCountry: Ref<Country | null> = ref(null);

const emit = defineEmits(['update:country']);

const updateCountry = (value: Country): void => {
    emit('update:country', value);
};
const setSelectedCountry = (val: string): void => {
    const selectedCountryObject = options.value.find((item) => item.name === val);
    if (selectedCountryObject) selectedCountry.value = selectedCountryObject;
};
const filterSelect = (val: string, update: (cb: () => void) => void): void => {
    update(() => {
        // Введенное пользователем значение в нижнем регистре
        const searchValue = val.toLowerCase();
        // Фильтруем список селекта для отображения стран, имя которых содержит введенное значение
        options.value = countryData.filter((country) => country.name.toLowerCase().includes(searchValue));
    });
};

defineComponent({
    name: 'SelectCountry',
});
</script>
