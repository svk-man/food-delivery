<template>
    <div class="products q-pa-md row justify-around items-stretch q-gutter-xl">
        <router-link
            class="products__item"
            v-for="product in products"
            :key="product.id"
            :to="`/catalog/${product.id}`"
        >
            <ProductCard :product="product" />
        </router-link>
    </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted } from 'vue';
import { ProductCard } from 'src/entities/product';
import { getSimplifiedProduct, fetchProducts, Product, SimplifiedProduct } from 'src/shared/api/products';
import { manageToken } from 'src/shared/api/auth';

const products = ref<SimplifiedProduct[]>([]);

const getProducts = async (): Promise<void> => {
    const key: string = import.meta.env.VITE_SPA_PROJECT_KEY;

    const token = await manageToken();

    const fetchedProducts = await fetchProducts(key, token);
    if (fetchedProducts) {
        const publishedFetchedProducts = fetchedProducts.filter(
            (fetchedProduct: Product) => fetchedProduct.masterData.published
        );

        const simplifiedProducts: SimplifiedProduct[] = [];
        if (publishedFetchedProducts.length) {
            publishedFetchedProducts.forEach((fetchedProduct: Product) =>
                simplifiedProducts.push(getSimplifiedProduct(fetchedProduct))
            );
        }

        products.value = simplifiedProducts;
    }
};

onMounted(getProducts);

defineComponent({
    name: 'ProductList',
});
</script>

<style lang="scss">
.products {
    &__item {
        color: black;
        text-decoration: none;
    }
}
</style>
