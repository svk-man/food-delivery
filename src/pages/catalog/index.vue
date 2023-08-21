<template>
    <q-page padding>
        <h1>Каталог</h1>
        <product-list />
    </q-page>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';
import ProductList from 'src/widgets/product-list';

defineComponent({
    name: 'CatalogPage',
});
</script>

<style scoped></style>
