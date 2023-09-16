<template>
    <q-page>
        <div class="container">
            <h2>{{ product.title }}</h2>
        </div>
    </q-page>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { defineComponent, onMounted, ref } from 'vue';
import { manageToken } from 'src/shared/api/auth';
import {
    Product,
    fetchProduct,
    getSimplifiedProduct,
    SimplifiedProduct,
    defaultSimplifiedProduct,
} from 'src/shared/api/products';

const route = useRoute();

const product = ref<SimplifiedProduct>({ ...defaultSimplifiedProduct });

const getProduct = async (productId: string): Promise<Product | null> => {
    const key: string = import.meta.env.VITE_SPA_PROJECT_KEY;

    const token = await manageToken();
    const fetchedProduct = await fetchProduct(key, token, productId);

    return fetchedProduct;
};

onMounted(async () => {
    const fetchedProduct = await getProduct(String(route.params.id));
    if (fetchedProduct) {
        product.value = getSimplifiedProduct(fetchedProduct);
    }
});

defineComponent({
    name: 'ProductPage',
});
</script>

<style scoped></style>
