<template>
    <q-layout>
        <q-header>
            <h2>Registration Page</h2>
            <div>
                <router-link to="/">Main</router-link>
            </div>
            <div>
                <router-link to="/signin">Authorization</router-link>
            </div>
        </q-header>
        <q-page-container>
            <q-page> </q-page>
        </q-page-container>
    </q-layout>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';

defineComponent({
    name: 'RegistrationPage',
});
</script>

<style scoped></style>
