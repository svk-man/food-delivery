<script setup lang="ts">
import { defineComponent, PropType } from 'vue';
import { TeamMember } from 'src/shared/lib/interfaces';
import styles from './styles.module.scss';

defineProps({
    teamMember: { type: Object as PropType<TeamMember>, required: true },
});

defineComponent({
    name: 'TeamMemberCard',
});
</script>

<template>
    <q-card :class="styles.card" flat bordered>
        <q-img :src="teamMember.imageSrc" :alt="teamMember.name" :class="styles.card__image" fit="fill" />

        <q-card-section class="q-mt-none q-pb-none q-pt-sm">
            <h3 class="text-subtitle1 text-accent text-bold">
                {{ teamMember.role }}
            </h3>
            <p class="text-caption text-grey">{{ teamMember.biography }}</p>
        </q-card-section>
    </q-card>
</template>
