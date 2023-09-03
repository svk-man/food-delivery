<template>
    <q-page>
        <div class="container">
            <span>Профиль</span>
            <profile-card />
        </div>
    </q-page>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';
import ProfileCard from 'src/features/profile-card';

defineComponent({
    name: 'RegistrationPage',
});
</script>

<style scoped></style>
