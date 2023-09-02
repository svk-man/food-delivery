<template>
    <div class="q-pa-md row items-start justify-around q-gutter-xl">
        <ProductCard
            v-for="product in products"
            :key="product.id"
            :title="product.masterData.current.name.ru"
            :description="`${product.masterData.current.description ? product.masterData.current.description.ru : ''}`"
            :image-src="`${
                product.masterData.current.masterVariant.images[0]
                    ? product.masterData.current.masterVariant.images[0].url
                    : 'https://dummyimage.com/600x400/fff/000&text=%D0%9D%D0%95+%D0%9D%D0%90%D0%99%D0%94%D0%95%D0%9D%D0%9E'
            }`"
        />
    </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted } from 'vue';
import { ProductCard } from 'src/entities/product';
import { manageToken } from '../../shared/api/auth';
import { fetchProducts, Product } from '../../shared/api/products';

const products = ref<Product[]>([]);

const getProducts = async (): Promise<void> => {
    const key: string = import.meta.env.VITE_SPA_PROJECT_KEY;

    const token = await manageToken();

    const fetchedProducts = await fetchProducts(key, token);
    if (fetchedProducts) {
        const publishedFetchedProducts = fetchedProducts.filter(
            (fetchedProduct: Product) => fetchedProduct.masterData.published
        );
        products.value = publishedFetchedProducts;
    }
};

onMounted(getProducts);

defineComponent({
    name: 'ProductList',
});
</script>
