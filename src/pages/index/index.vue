<template>
    <q-page padding>
        <h3>Main Page</h3>
        <product-list />
    </q-page>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';
import ProductList from 'src/widgets/product-list';

defineComponent({
    name: 'IndexPage',
});
</script>
