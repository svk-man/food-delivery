<template>
    <q-page>
        <div class="container">
            <registration-form />
        </div>
    </q-page>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted } from 'vue';
import RegistrationForm from 'src/features/registration-form';
import { manageToken } from 'src/shared/api/auth';

onMounted(manageToken);

defineComponent({
    name: 'RegistrationPage',
});
</script>

<style scoped></style>
