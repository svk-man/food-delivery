<template>
    <q-page>
        <div class="container">
            <h2>{{ product.title }}</h2>
            <q-img
                :src="product.imageSrc"
                :alt="product.title"
                width="250px"
                height="350px"
                fit="fill"
                class="q-mb-md"
            />
            <div v-if="product.discountedPrice" class="row q-gutter-md q-mb-md">
                <div class="text-subtitle1 text-accent text-bold">
                    {{ product.discountedPrice }} {{ product.currencyCode }}
                </div>
                <div class="text-subtitle1 text-grey-6 text-strike">{{ product.price }}</div>
            </div>
            <div v-else-if="product.price" class="q-mb-md text-subtitle1 text-accent text-bold">
                {{ product.price }} {{ product.currencyCode }}
            </div>
            <div v-else class="q-mb-md text-subtitle1 text-accent text-bold">Товар закончился</div>
            <p class="text-caption text-grey">{{ product.description }}</p>
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
