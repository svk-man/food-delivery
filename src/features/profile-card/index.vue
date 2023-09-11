<template>
    <q-form class="wrapper">
        <q-tabs
            v-model="tab"
            inline-label
            switch-indicator
            indicator-color="primary"
            class="bg-orange-5 text-white shadow-1"
        >
            <q-tab name="mainInfo" icon="person" label="Профиль" />
            <q-tab name="shipping" icon="local_shipping" label="Доставка" />
            <q-tab name="billing" icon="payment" label="Оплата" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="mainInfo">
                <input-name v-model="userData.firstName" @blur="sendDataToBackend('setFirstName', 'firstName')" />
                <input-surname v-model="userData.lastName" @blur="sendDataToBackend('setLastName', 'lastName')" />
                <input-email v-model="userData.email" @blur="sendDataToBackend('changeEmail', 'email')" />
                <input-birth-date
                    v-model="userData.dateOfBirth"
                    @blur="sendDataToBackend('setDateOfBirth', 'dateOfBirth')"
                />
            </q-tab-panel>
            <q-tab-panel name="shipping">
                <input-city v-model="shippingAddress.city" @blur="sendDataToBackend('changeEmail', 'email')" />
                <input-street v-model="shippingAddress.streetName" />
                <q-input
                    v-model="shippingAddress.postalCode"
                    label="Индекс *"
                    outlined
                    stack-label
                    color="accent"
                    reactive-rules
                />
            </q-tab-panel>
            <q-tab-panel name="billing">
                <input-city v-model="billingAddress.city" @blur="sendDataToBackend('changeEmail', 'email')" />
                <input-street v-model="billingAddress.streetName" />
                <q-input
                    v-model="billingAddress.postalCode"
                    label="Индекс *"
                    outlined
                    stack-label
                    color="accent"
                    reactive-rules
                />
            </q-tab-panel>
        </q-tab-panels>
    </q-form>
</template>

<script setup lang="ts">
import { Cookies } from 'quasar';
import { defineComponent, onMounted, ref } from 'vue';
import InputName from 'src/features/registration-form/ui/inputName.vue';
import InputSurname from 'src/features/registration-form/ui/inputSurname.vue';
import InputEmail from 'src/shared/ui/inputEmail.vue';
import InputBirthDate from 'src/features/registration-form/ui/inputBirthDate.vue';
import InputCity from 'src/features/registration-form/ui/inputCity.vue';
import InputStreet from 'src/features/registration-form/ui/inputStreet.vue';

import getCustomerData, { setCustomerData } from './model/handleProfileData';

const tab = ref('mainInfo');
const hasFocus = ref(false);

interface AddressType {
    city: string;
    country: string;
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    postalCode: string;
    streetName: string;
}
const defaultAddress: AddressType = {
    city: '',
    country: '',
    email: '',
    firstName: '',
    id: '',
    lastName: '',
    postalCode: '',
    streetName: '',
};

const userData = ref({
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    defaultShippingAddressId: '',
    defaultBillingAddressId: '',
    isEmailVerified: false,
    version: '',
});

const shippingAddress = ref({
    city: '',
    country: '',
    email: '',
    firstName: '',
    id: '',
    lastName: '',
    postalCode: '',
    streetName: '',
});
const billingAddress = ref({
    city: '',
    country: '',
    email: '',
    firstName: '',
    id: '',
    lastName: '',
    postalCode: '',
    streetName: '',
});

const token: string = Cookies.get('auth_token');

async function customerHendler(): Promise<void> {
    const response = await getCustomerData(token);
    const {
        email,
        firstName,
        lastName,
        dateOfBirth,
        addresses,
        defaultShippingAddressId,
        defaultBillingAddressId,
        isEmailVerified,
        version,
        ...rest
    } = response;

    const [shipping, billing] = addresses.length > 0 ? addresses : [defaultAddress, defaultAddress];

    if (shipping !== undefined) {
        shippingAddress.value = shipping;
    }
    if (billing !== undefined) {
        billingAddress.value = billing;
    }

    const filteredData = {
        email,
        firstName,
        lastName,
        dateOfBirth: `${dateOfBirth}`,
        defaultShippingAddressId,
        defaultBillingAddressId,
        isEmailVerified,
        version: `${version}`,
    };

    userData.value = filteredData;
}

async function sendDataToBackend(userAction: string, field: string): Promise<void> {
    hasFocus.value = false;
    const result = { ...userData.value };

    const value = userAction === 'setDateOfBirth' ? result[field].replaceAll('/', '-') : result[field];

    const action = {
        action: userAction,
        [field]: value,
    };
    const data = {
        version: +result.version,
        actions: [action],
    };

    const userToken: string = Cookies.get('auth_token');
    await setCustomerData(userToken, data);
}

onMounted(customerHendler);

defineComponent({
    name: 'ProfileCard',
});
</script>

<style lang="scss" scoped>
.info {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    &__addresses {
        display: flex;
        gap: 12px;
    }
}
</style>
