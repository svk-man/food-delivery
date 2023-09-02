<template>
    <q-card :class="styles.card" flat bordered>
        <q-img :src="imageSrc" :alt="title" />

        <q-card-section>
            <h3 class="text-h5 q-mt-sm q-mb-xs">{{ title }}</h3>
            <p class="text-caption text-grey">{{ truncedDescription }}</p>
        </q-card-section>
    </q-card>
</template>

<script setup lang="ts">
import { defineComponent, computed } from 'vue';
import styles from './styles.module.scss';

const props = defineProps({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageSrc: { type: String, required: true },
});

const truncedDescription = computed(() => {
    const DESCRIPTION_MAX_LENGTH = 30;
    const DESCRIPTION_MAX_WORDS_COUNT = 34;

    if (props.description.length <= DESCRIPTION_MAX_LENGTH) {
        return props.description;
    }

    const splittedDescription = props.description.split(' ');

    return `${splittedDescription.slice(0, DESCRIPTION_MAX_WORDS_COUNT).join(' ')}...`;
});

defineComponent({
    name: 'ProductCard',
});
</script>
