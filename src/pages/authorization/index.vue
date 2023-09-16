<template>
    <q-page>
        <div class="container">
            <auth-form />
        </div>
    </q-page>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';
import AuthForm from 'src/features/auth-form';

defineComponent({
    name: 'AuthorizationPage',
});
</script>
