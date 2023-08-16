<template>
    <ul>
        <li v-for="product in products" :key="product.id">{{ product.masterData.current.name.ru }}</li>
    </ul>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted } from 'vue';
import { auth, getTokenFromCookies } from '../../shared/api/auth';
import { fetchProducts, Product } from '../../shared/api/products';

const products = ref<Product[]>([]);

const getProducts = async (): Promise<void> => {
    const key: string = import.meta.env.VITE_SPA_PROJECT_KEY;
    const token = getTokenFromCookies();

    if (!token) {
        await auth();
    }

    const fetchedProducts = await fetchProducts(key, token);
    if (fetchedProducts) products.value = fetchedProducts;
};

onMounted(getProducts);

defineComponent({
    name: 'ProductList',
});
</script>
