<template>
    <q-page padding>
        <auth-form />
    </q-page>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';
import AuthForm from 'src/features/auth-form';

defineComponent({
    name: 'AuthorizationPage',
});
</script>

<style scoped></style>
