<template>
    <q-layout>
        <q-header class="bg-secondary">
            <div class="container q-py-md">
                <div class="bg-primary">
                    <div v-for="link in linksToPages" :key="link.to">
                        <router-link :to="link.to">{{ link.label }}</router-link>
                    </div>
                </div>
            </div>
        </q-header>
        <q-page-container class="bg-secondary">
            <div class="container q-py-md">
                <RouterView />
            </div>
        </q-page-container>
        <q-footer class="bg-secondary">
            <div class="container q-pt-md">Footer</div>
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

<style lang="scss" scoped>
.container {
    max-width: 1576px;
    margin: 0 auto;
}
</style>
