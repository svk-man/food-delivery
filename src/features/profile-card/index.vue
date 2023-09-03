<template>
    <q-form> </q-form>
</template>

<script setup lang="ts">
import { Cookies } from 'quasar';
import { defineComponent, onMounted } from 'vue';
import getCustomerData from './model/handleProfileData';

const token: string = Cookies.get('auth_token');

async function customerHendler(): Promise<void> {
    const response = await getCustomerData(token);
}

onMounted(customerHendler);

defineComponent({
    name: 'ProfileCard',
});
</script>

<style lang="scss" scoped></style>
