<template>
    <q-form @submit.prevent="submit" class="signup-form">
        <h4 class="signup-form__title q-ma-none q-mb-md">Регистрация</h4>
        <input-name @update:first-name="handleFirstNameUpdate" @update:last-name="handleLastNameUpdate" />
        <input-email @update:email="handleEmailUpdate" class="signup-form__input" />
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
import InputEmail from 'src/shared/ui/inputEmail.vue';
import InputPassword from './ui/inputPassword.vue';
import { isValidPostalCode } from './lib/isValidPostalCode';
import { Country, UserData } from './lib/types';
import InputName from './ui/inputName.vue';
import InputBirthDate from './ui/inputBirthDate.vue';
import SelectCountry from './ui/inputCountry.vue';
import InputPostalCode from './ui/inputPostalCode.vue';
import InputCity from './ui/inputCity.vue';
import InputStreet from './ui/inputStreet.vue';
import handleUserRegistration from './model/handleUserRegistration';

const userData: UserData = {
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    city: '',
    street: '',
    password: '',
};
const selectedCountry: Ref<Country> = ref({ name: '', postalCodePattern: '' });
const postalCodePattern = ref('');

const handleFirstNameUpdate = (firstName: string): void => {
    userData.firstName = firstName;
};
const handleLastNameUpdate = (lastName: string): void => {
    userData.lastName = lastName;
};
const handleEmailUpdate = (email: string): void => {
    userData.email = email;
};
const handleDateUpdate = (date: string): void => {
    userData.dateOfBirth = date;
};
const handleCountryUpdate = (country: Country): void => {
    selectedCountry.value = country;
};
const handleCityUpdate = (city: string): void => {
    userData.city = city;
};
const handleStreetUpdate = (street: string): void => {
    userData.street = street;
};
const handlePasswordUpdate = (password: string): void => {
    userData.password = password;
};
const submit = (): void => {
    handleUserRegistration(userData);
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
        margin-top: 25px;
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
    }
}
</style>
