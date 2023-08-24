<template>
    <q-layout>
        <Header />
        <q-page-container class="bg-secondary">
            <div class="container">
                <RouterView />
            </div>
        </q-page-container>
        <q-footer class="bg-secondary">
            <div class="container q-pt-md">Footer</div>
        </q-footer>
    </q-layout>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';
import Header from '../widgets/header/index';

defineComponent({
    name: 'App',
});
</script>
