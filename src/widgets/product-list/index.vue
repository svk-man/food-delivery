<template>
    <ul>
        <li v-for="product in products" :key="product.id">{{ product.masterData.current.name.ru }}</li>
    </ul>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted } from 'vue';
import { fetchAccessToken, fetchProducts, Product } from '../../shared/api/auth';

const products = ref<Product[]>([]);

const getProducts = async (): Promise<void> => {
    const key: string = import.meta.env.VITE_SPA_PROJECT_KEY;
    const id: string = import.meta.env.VITE_SPA_CLIENT_ID;
    const secret: string = import.meta.env.VITE_SPA_CLIENT_SECRET;
    const scope: string = import.meta.env.VITE_SPA_SCOPE;
    const token = `${await fetchAccessToken(id, secret, scope)}`;
    const fetchedProducts = await fetchProducts(key, token);

    if (fetchedProducts) products.value = fetchedProducts;
};

onMounted(getProducts);

defineComponent({
    name: 'ProductList',
});
</script>
