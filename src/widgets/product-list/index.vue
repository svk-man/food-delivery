<template>
    <div class="q-pa-md row justify-around items-stretch q-gutter-xl">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted } from 'vue';
import { ProductCard } from 'src/entities/product';
import { CurrencyCode, fetchProducts, Product, SimplifiedProduct } from 'src/shared/api/products';
import { manageToken } from 'src/shared/api/auth';

const products = ref<SimplifiedProduct[]>([]);

function getSimplifiedProduct(fetchedProduct: Product): SimplifiedProduct {
    const title = fetchedProduct.masterData.current.name.ru ? fetchedProduct.masterData.current.name.ru : '';
    const description = fetchedProduct.masterData.current.description.ru
        ? fetchedProduct.masterData.current.description.ru
        : '';
    const imageSrc = fetchedProduct.masterData.current.masterVariant.images[0]
        ? fetchedProduct.masterData.current.masterVariant.images[0].url
        : 'image-not-found.png';
    const currencyCode = fetchedProduct.masterData.current.masterVariant.prices[0]
        ? fetchedProduct.masterData.current.masterVariant.prices[0].value.currencyCode
        : CurrencyCode.RUB;

    let price = '';
    if (fetchedProduct.masterData.current.masterVariant.prices[0]?.value) {
        const { centAmount, fractionDigits } = fetchedProduct.masterData.current.masterVariant.prices[0].value;
        price = `${centAmount / 10 ** fractionDigits}`;
    }

    let discountedPrice = '';
    if (fetchedProduct.masterData.current.masterVariant.prices[0]?.discounted) {
        const { centAmount, fractionDigits } =
            fetchedProduct.masterData.current.masterVariant.prices[0].discounted.value;
        discountedPrice = `${centAmount / 10 ** fractionDigits}`;
    }

    return {
        id: fetchedProduct.id,
        title,
        description,
        imageSrc,
        currencyCode,
        price,
        discountedPrice,
    };
}

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
