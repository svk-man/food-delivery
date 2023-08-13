<template>
    <q-form @submit.prevent="console.log('Submit')" class="signup-form">
        <input-name @update:first-name="handleFirstNameUpdate" @update:last-name="handleLastNameUpdate" />
        <input-email @update:email="handleEmailUpdate" />
        <input-birth-date @update:date="handleDateUpdate" />
        <select-country @update:country="handleCountryUpdate" />
        <input-postal-code
            :disable="!postalCodePattern"
            :rules="[
                (val: string) => (val && val.length) || 'Обязательное поле',
                (val: string) => isValidPostalCode(postalCodePattern, val) || 'Индекс не соотвествует выбранной стране',
            ]"
        />
        <input-city @update:city="handleCityUpdate" />
        <input-street @update:street="handleStreetUpdate" />
        <input-password @update:password="handlePasswordUpdate" />
        <q-btn
            label="Зарегистрироваться"
            type="submit"
            push
            padding="md"
            color="positive"
            class="full-width font-inter-500 signup-form__btn"
        />
    </q-form>
</template>

<script setup lang="ts">
import { Ref, defineComponent, ref, watch } from 'vue';
import { isValidPostalCode } from './lib/isValidPostalCode';
import { Country } from './lib/types';
import InputName from './ui/inputName.vue';
import InputEmail from './ui/inputEmail.vue';
import InputBirthDate from './ui/inputBirthDate.vue';
import SelectCountry from './ui/inputCountry.vue';
import InputPostalCode from './ui/inputPostalCode.vue';
import InputCity from './ui/inputCity.vue';
import InputStreet from './ui/inputStreet.vue';
import InputPassword from './ui/inputPassword.vue';

let userFirstName = '';
let userLastName = '';
let userEmail = '';
let userDateOfBirth = '';
let userCity = '';
let userStreet = '';
let userPassword = '';
const selectedCountry: Ref<Country> = ref({ name: '', postalCodePattern: '' });
const postalCodePattern = ref('');

const handleFirstNameUpdate = (firstName: string): void => {
    userFirstName = firstName;
};
const handleLastNameUpdate = (lastName: string): void => {
    userLastName = lastName;
};
const handleEmailUpdate = (email: string): void => {
    userEmail = email;
};
const handleDateUpdate = (date: string): void => {
    userDateOfBirth = date;
};
const handleCountryUpdate = (country: Country): void => {
    selectedCountry.value = country;
};
const handleCityUpdate = (city: string): void => {
    userCity = city;
};
const handleStreetUpdate = (street: string): void => {
    userStreet = street;
};
const handlePasswordUpdate = (password: string): void => {
    userPassword = password;
};

watch(selectedCountry, () => {
    postalCodePattern.value = selectedCountry.value.postalCodePattern;
});

defineComponent({
    name: 'RegistrationForm',
});
</script>

<style lang="scss">
.signup-form {
    max-width: 640px;
    margin: auto;
    padding: 24px;
    background-color: $primary;
    border-radius: 16px;

    &__input {
        margin-top: 5px;
    }
    &__btn {
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
    }
}
</style>
