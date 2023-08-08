<template>
    <ul>
        <h1>Products component!</h1>
        <li v-for="product in products" :key="product.id">{{ product.masterData.current.name.ru }}</li>
    </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fetchAccessToken, fetchProducts, Product } from '../shared/api/auth';

export default defineComponent({
    name: 'ShowProducts',
    data() {
        return {
            products: [] as Product[],
        };
    },
    mounted() {
        this.getProducts();
    },
    methods: {
        async getProducts() {
            const key = import.meta.env.VITE_SPA_PROJECT_KEY;
            const id = import.meta.env.VITE_SPA_CLIENT_ID;
            const secret = import.meta.env.VITE_SPA_CLIENT_SECRET;
            const scope = import.meta.env.VITE_SPA_SCOPE;

            const token = `${await fetchAccessToken(id, secret, scope)}`;
            const productss = await fetchProducts(key, token);

            if (productss !== null) {
                this.products = productss;
            }
        },
    },
});
</script>
