<template>
    <q-layout>
        <q-header>
            <div v-for="link in linksToPages" :key="link.to">
                <router-link :to="link.to">{{ link.label }}</router-link>
            </div>
        </q-header>
        <q-page-container>
            <RouterView />
        </q-page-container>
        <q-footer>
            <div>Footer</div>
        </q-footer>
    </q-layout>
</template>

<script lang="ts" setup>
import { ref, defineComponent } from 'vue';

const linksToPages = ref([
    { to: '/', label: 'Main' },
    { to: '/register', label: 'Registration Page' },
    { to: '/signin', label: 'Authorization Page' },
]);

defineComponent({
    name: 'App',
});
</script>
