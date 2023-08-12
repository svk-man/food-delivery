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
        @input-value="setModel"
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
const setModel = (val: string): void => {
    const selectedCountryObject = options.value.find((item) => item.name === val);
    if (selectedCountryObject) selectedCountry.value = selectedCountryObject;
};
const filterSelect = (val: string, update: (cb: () => void) => void): void => {
    update(() => {
        const needle = val.toLocaleLowerCase();
        options.value = countryData.filter((item) => item.name.toLocaleLowerCase().indexOf(needle) > -1);
    });
};

defineComponent({
    name: 'SelectCountry',
});
</script>

<style lang="scss" scoped></style>
