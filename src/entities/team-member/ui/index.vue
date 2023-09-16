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

        <q-card-section class="q-px-md" horizontal>
            <h3 class="text-h5 text-accent text-bold q-my-none q-py-sm">
                {{ teamMember.name }}
            </h3>
            <q-card-section class="q-pa-sm flex flex-center">
                <q-btn
                    v-if="teamMember.github"
                    flat
                    round
                    icon="fa-brands fa-github"
                    size="sm"
                    :href="teamMember.github"
                    target
                ></q-btn>
                <q-badge v-else outline align="middle" color="red"> Покинул проект </q-badge>
            </q-card-section>
        </q-card-section>

        <q-card-section class="q-mt-none q-py-none">
            <h4 class="text-subtitle1 text-accent text-bold q-my-none q-py-sm">
                {{ teamMember.role }}
            </h4>
            <p v-if="teamMember.biography" class="text-caption text-grey q-my-none q-py-sm">
                {{ teamMember.biography }}
            </p>
            <ul :class="styles['card__results-list']">
                <li v-for="(result, index) in teamMember.results" :key="index">
                    {{ result }}
                </li>
            </ul>
        </q-card-section>
    </q-card>
</template>
