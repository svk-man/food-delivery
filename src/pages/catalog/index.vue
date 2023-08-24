<template>
    <q-page>
        <div class="container">
            <h2>Каталог</h2>
            <product-list />
        </div>
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
