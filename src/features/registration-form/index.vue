<template>
    <q-form @submit.prevent="submit" class="signup-form">
        <h4 class="signup-form__title q-ma-none q-mb-md">Регистрация</h4>
        <input-name @update:first-name="handleFirstNameUpdate" @update:last-name="handleLastNameUpdate" />
        <input-email @update:email="handleEmailUpdate" class="signup-form__input" />
        <input-birth-date @update:date="handleDateUpdate" />
        <div class="addresses">
            <div class="addresses__address">
                <div class="addresses__address-header">
                    <q-icon name="local_shipping" size="26px" />
                    <span>Shipping address</span>
                </div>
                <q-checkbox
                    class="checkbox"
                    v-model="valShipping"
                    label="Использовать как адрес доставки по умолчанию"
                    color="orange"
                />
                <select-country @update:country="handleCountryUpdateShipping" />
                <input-postal-code
                    :disable="!postalCodePatternShipping"
                    :rules="[
                        (val: string) => (val && val.length) || 'Обязательное поле',
                        (val: string) =>
                            isValidPostalCode(postalCodePatternShipping, val) ||
                            'Индекс не соотвествует выбранной стране',
                    ]"
                    @update:postal="handlePostalUpdateShipping"
                />
                <input-city @update:city="handleCityUpdateShipping" />
                <input-street @update:street="handleStreetUpdateShipping" />
                <q-toggle v-model="sameAddress" color="yellow" label="Сохранить и как биллинг" />
            </div>
            <div v-if="!sameAddress" class="addresses__address">
                <div class="addresses__address-header">
                    <q-icon name="local_atm" size="26px" />
                    <span>Billing address</span>
                </div>
                <q-checkbox
                    class="checkbox"
                    v-model="valBilling"
                    label="Использовать как адрес для выставления счетов по умолчанию"
                    color="orange"
                />
                <select-country @update:country="handleCountryUpdateBilling" />
                <input-postal-code
                    :disable="!postalCodePatternBilling"
                    :rules="[
                        (val: string) => (val && val.length) || 'Обязательное поле',
                        (val: string) =>
                            isValidPostalCode(postalCodePatternBilling, val) ||
                            'Индекс не соотвествует выбранной стране',
                    ]"
                    @update:postal="handlePostalUpdateBilling"
                />
                <input-city @update:city="handleCityUpdateBilling" />
                <input-street @update:street="handleStreetUpdateBilling" />
            </div>
        </div>

        <input-password @update:password="handlePasswordUpdate" />
        <q-btn
            label="Зарегистрироваться"
            type="submit"
            push
            padding="md"
            color="positive"
            class="full-width font-inter-500 signup-form__btn"
        />
        <q-btn
            to="/signin"
            label="Войти"
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
import { Address, Country, Customer } from './lib/types';
import InputName from './ui/inputName.vue';
import InputBirthDate from './ui/inputBirthDate.vue';
import SelectCountry from './ui/inputCountry.vue';
import InputPostalCode from './ui/inputPostalCode.vue';
import InputCity from './ui/inputCity.vue';
import InputStreet from './ui/inputStreet.vue';
import handleUserRegistration from './model/handleUserRegistration';

const customerData: Customer = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    addresses: [],
};
const addressShipping: Address = {
    firstName: '',
    lastName: '',
    streetName: '',
    postalCode: '',
    city: '',
    country: '',
    email: '',
};
const addressBilling: Address = {
    firstName: '',
    lastName: '',
    streetName: '',
    postalCode: '',
    city: '',
    country: '',
    email: '',
};

const valShipping = ref(false);
const valBilling = ref(false);
const sameAddress = ref(false);

const selectedCountryShipping: Ref<Country> = ref({ name: '', postalCodePattern: '' });
const selectedCountryBilling: Ref<Country> = ref({ name: '', postalCodePattern: '' });

const postalCodePatternShipping = ref('');
const postalCodePatternBilling = ref('');

const handleFirstNameUpdate = (firstName: string): void => {
    customerData.firstName = firstName;
};
const handleLastNameUpdate = (lastName: string): void => {
    customerData.lastName = lastName;
};
const handleEmailUpdate = (email: string): void => {
    customerData.email = email;
};
const handleDateUpdate = (date: string): void => {
    customerData.dateOfBirth = date;
};

const countriesWithCode: { [key: string]: string } = {
    Россия: 'RU',
    Казахстан: 'KZ',
    США: 'US',
    Канада: 'CA',
};
const handleCountryUpdateShipping = (country: Country): void => {
    selectedCountryShipping.value = country;

    addressShipping.country = `${countriesWithCode[country.name]}`;
};
const handleCountryUpdateBilling = (country: Country): void => {
    selectedCountryBilling.value = country;

    addressBilling.country = `${countriesWithCode[country.name]}`;
};

const handlePostalUpdateShipping = (postal: string): void => {
    addressShipping.postalCode = postal;
};
const handlePostalUpdateBilling = (postal: string): void => {
    addressBilling.postalCode = postal;
};
const handleCityUpdateShipping = (city: string): void => {
    addressShipping.city = city;
};
const handleCityUpdateBilling = (city: string): void => {
    addressBilling.city = city;
};

const handleStreetUpdateShipping = (street: string): void => {
    addressShipping.streetName = street;
};
const handleStreetUpdateBilling = (street: string): void => {
    addressBilling.streetName = street;
};

const handlePasswordUpdate = (password: string): void => {
    customerData.password = password;
};

function isObjectEmpty(object: object): boolean {
    return Object.keys(object).length < 1;
}
function addAdressIfNotEmpty(address: Address): void {
    if (!isObjectEmpty(address)) {
        customerData.addresses.push(address);
    }
}

function setDefaultShippingAddress(): void {
    customerData.defaultShippingAddress = 0;
}
function setDefaultBillingAddress(): void {
    customerData.defaultBillingAddress = 1;
}

function setShippingAsDefaultToBilling(): void {
    customerData.defaultBillingAddress = 0;
}

function addDefaultAddressHandler(): void {
    if (valShipping.value) setDefaultShippingAddress();
    if (valBilling.value) setDefaultBillingAddress();
    if (sameAddress.value) setShippingAsDefaultToBilling();
}

const submit = (): void => {
    addAdressIfNotEmpty(addressShipping);
    addAdressIfNotEmpty(addressBilling);

    addDefaultAddressHandler();

    handleUserRegistration(customerData);
};

watch(selectedCountryShipping, () => {
    postalCodePatternShipping.value = selectedCountryShipping.value.postalCodePattern;
});
watch(selectedCountryBilling, () => {
    postalCodePatternBilling.value = selectedCountryBilling.value.postalCodePattern;
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
    .addresses {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 12px;
        width: 100%;
        &__address {
            flex-grow: 1;
            &-header {
                display: flex;
                gap: 12px;
                align-items: center;
            }
            .checkbox {
                max-width: 270px;
            }
        }
    }
}
</style>
