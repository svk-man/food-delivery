<template>
    <q-form class="wrapper">
        <div class="info">
            <div class="info__main">
                <q-card outlined>
                    <q-card-section>
                        <q-input
                            label="Имя"
                            v-model="userData.firstName"
                            :editable="isEditMode"
                            standout="bg-orange text-white"
                            @blur="handleBlur('setFirstName', 'firstName')"
                        />
                        <q-input
                            label="Фамилия"
                            v-model="userData.lastName"
                            :editable="isEditMode"
                            standout="bg-orange text-white"
                            @blur="handleBlur('setLastName', 'lastName')"
                        />
                        <q-input
                            label="Почта"
                            v-model="userData.email"
                            :editable="isEditMode"
                            standout="bg-orange text-white"
                            @blur="handleBlur('changeEmail', 'email')"
                        />
                        <q-input
                            label="Дата рождения"
                            v-model="userData.dateOfBirth"
                            :editable="isEditMode"
                            standout="bg-orange text-white"
                            placeholder="гггг/мм/дд"
                            mask="date"
                            :rules="[isValidDate, (val, rules) => rules.date(val) || 'Некорректная дата']"
                            @blur="handleBlur('setDateOfBirth', 'dateOfBirth')"
                        />
                    </q-card-section>
                </q-card>
            </div>

            <div class="info__addresses">
                <q-card outlined>
                    <q-card-section>
                        <div class="shipping__title">Адрес доставки</div>
                        <div class="shipping__content">
                            <q-input
                                label="Город"
                                v-model="shippingAddress.city"
                                :editable="isEditMode"
                                standout="bg-orange text-white"
                                @blur="handleBlur('changeEmail', 'email')"
                            />
                            <q-input
                                label="Улица"
                                v-model="shippingAddress.streetName"
                                :editable="isEditMode"
                                standout="bg-orange text-white"
                            />
                            <q-input
                                label="Почтовый индекс"
                                v-model="shippingAddress.postalCode"
                                :editable="isEditMode"
                                standout="bg-orange text-white"
                            />
                        </div>
                    </q-card-section>
                </q-card>

                <q-card outlined>
                    <q-card-section>
                        <div class="billing__title">Адрес для выставления счёта</div>
                        <div class="shipping__content">
                            <q-input
                                label="Город"
                                v-model="billingAddress.city"
                                :editable="isEditMode"
                                standout="bg-orange text-white"
                            />
                            <q-input
                                label="Улица"
                                v-model="billingAddress.streetName"
                                :editable="isEditMode"
                                standout="bg-orange text-white"
                            />
                            <q-input
                                label="Почтовый индекс"
                                v-model="billingAddress.postalCode"
                                :editable="isEditMode"
                                standout="bg-orange text-white"
                            />
                        </div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-form>
</template>

<script setup lang="ts">
import { Cookies } from 'quasar';
import { defineComponent, onMounted, ref } from 'vue';
import { isValidDate } from '../registration-form/lib/isValidDate';
import getCustomerData, { setCustomerData } from './model/handleProfileData';

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

const isEditMode = ref(false);
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

async function handleBlur(userAction: string, field: string): Promise<void> {
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
