<template>
    <q-card :class="styles.card" flat bordered>
        <q-img :src="product.imageSrc" :alt="product.title" height="350px" fit="fill" />

        <q-card-section class="q-mt-none q-pb-none q-pt-md">
            <div v-if="product.discountedPrice" class="row q-gutter-md">
                <div class="text-subtitle1 text-accent text-bold">
                    {{ product.discountedPrice }} {{ product.currencyCode }}
                </div>
                <div class="text-subtitle1 text-grey-6 text-strike">{{ product.price }}</div>
            </div>
            <div v-else-if="product.price" class="text-subtitle1 text-accent text-bold">
                {{ product.price }} {{ product.currencyCode }}
            </div>
            <div v-else class="text-subtitle1 text-accent text-bold">Товар закончился</div>
        </q-card-section>

        <q-card-section>
            <h3 class="text-h5 q-mt-none q-mb-xs">{{ product.title }}</h3>
            <p class="text-caption text-grey">{{ truncedDescription }}</p>
        </q-card-section>

        <q-space></q-space>

        <q-card-actions class="q-mt-auto vertical-bottom">
            <q-btn
                label="Добавить в корзину"
                class="button full-width"
                rounded
                color="orange-5"
                text-color="white"
                :disable="!isAvailableProduct"
            />
        </q-card-actions>
    </q-card>
</template>

<script setup lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { SimplifiedProduct } from 'src/shared/api/products';
import styles from './styles.module.scss';

const props = defineProps({
    product: { type: Object as PropType<SimplifiedProduct>, required: true },
});

const truncedDescription = computed(() => {
    const DESCRIPTION_MAX_LENGTH = 30;
    const DESCRIPTION_MAX_WORDS_COUNT = 34;

    const { description } = props.product;
    if (description.length <= DESCRIPTION_MAX_LENGTH) {
        return description;
    }

    return `${description.split(' ').slice(0, DESCRIPTION_MAX_WORDS_COUNT).join(' ')}...`;
});

const isAvailableProduct = computed(() => Number(props.product.discountedPrice) > 0 || Number(props.product.price) > 0);

defineComponent({
    name: 'ProductCard',
});
</script>
