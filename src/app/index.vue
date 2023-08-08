<template>
    <q-layout>
        <q-header>
            <div>
                <router-link to="/">Main</router-link>
            </div>
            <div>
                <router-link to="/register">Registration</router-link>
            </div>
            <div>
                <router-link to="/signin">Authorization</router-link>
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

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'App',
});
</script>
