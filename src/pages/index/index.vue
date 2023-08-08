<template>
    <div>Index Page</div>
    <product-list />
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';
import ProductList from 'src/widgets/product-list';

defineComponent({
    name: 'IndexPage',
});
</script>
