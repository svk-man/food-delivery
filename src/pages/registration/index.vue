<template>
    <q-page padding>
        <registration-form />
    </q-page>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';
import RegistrationForm from 'src/features/registration-form';

defineComponent({
    name: 'RegistrationPage',
});
</script>

<style scoped></style>
