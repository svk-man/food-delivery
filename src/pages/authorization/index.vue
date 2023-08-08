<template>
    <q-layout>
        <q-header>
            <h2>Authorization Page</h2>
            <div>
                <router-link to="/">Main</router-link>
            </div>
            <div>
                <router-link to="/register">Registration</router-link>
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
    name: 'AuthorizationPage',
});
</script>

<style scoped></style>
