<script lang="ts" setup>
import { defineComponent, ref } from 'vue';
import { TeamMember } from 'src/shared/lib/interfaces';
import { TeamMemberCard } from 'src/entities/team-member';

const teamMembers = ref<TeamMember[]>([
    {
        name: 'Кравченко Сергей',
        imageSrc: '/public/about us/1.jpg',
        role: 'Frontend Developer, TeamLead',
        biography: '',
    },
    {
        name: 'Светлана',
        imageSrc: '/public/about us/2.jpg',
        role: 'Frontend Developer',
        biography: '',
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
