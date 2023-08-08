<template>
    <q-layout>
        <q-header>
            <h2>Index Page</h2>
            <div>
                <router-link to="/register">Registration</router-link>
            </div>
        </q-header>
        <q-page-container>
            <q-page>
                <product-list />
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';
import ProductList from 'src/widgets/product-list';

defineComponent({
    name: 'IndexPage',
});
</script>
