<script lang="ts" setup>
import { defineComponent, ref } from 'vue';
import { TeamMember } from 'src/shared/lib/interfaces';
import { TeamMemberCard } from 'src/entities/team-member';

const teamMembers = ref<TeamMember[]>([
    {
        name: 'Кравченко Сергей',
        imageSrc: '/public/about us/1.jpg',
        github: 'https://github.com/svk-man',
        role: 'Frontend Developer, TeamLead',
        biography: '',
        results: ['Sprint#1. Создание и настройка репозитория', 'Sprint#1. Реализация 404-страницы'],
    },
    {
        name: 'Светлана',
        imageSrc: '/public/about us/2.jpg',
        github: 'https://github.com/sosukii',
        role: 'Frontend Developer',
        biography: '',
        results: [
            'Sprint#1. Создание шаблона для Pull Request',
            'Sprint#1. Создание и настройка доски в Trello',
            'Sprint#1. Создание проекта в CommerceTools и настройка API Client',
        ],
    },
    {
        name: 'Степан',
        imageSrc: '/public/about us/3.jpg',
        github: '',
        role: 'Frontend Developer',
        biography: '',
        results: [
            'Sprint#1. Разработка конфигурации окружения (Vue 3, Vite, TypeScript, ESLint, Prettier, Husky)',
            'Sprint#1. Написание README для проекта',
        ],
    },
]);

defineComponent({
    name: 'TeamMembersList',
});
</script>

<template>
    <div class="q-pa-md row justify-around items-stretch q-gutter-xl">
        <TeamMemberCard v-for="(teamMember, index) in teamMembers" :key="index" :teamMember="teamMember" />
    </div>
</template>
