<template>
    <q-card :class="styles.card" flat bordered>
        <q-img :src="imageSrc" :alt="title" />

        <q-card-section>
            <h3 class="text-h5 q-mt-sm q-mb-xs">{{ title }}</h3>
            <p class="text-caption text-grey">{{ description }}</p>
        </q-card-section>
    </q-card>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import styles from './styles.module.scss';

defineProps({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageSrc: { type: String, required: true },
});

defineComponent({
    name: 'ProductCard',
});
</script>
