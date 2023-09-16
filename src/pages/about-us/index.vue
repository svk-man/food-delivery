<script setup lang="ts">
import { defineComponent } from 'vue';
import TeamMembersList from 'src/widgets/team-members-list';

defineComponent({
    name: 'AboutUsPage',
});
</script>

<template>
    <q-page>
        <div class="container">
            <h2 class="text-h2 text-uppercase text-center text-bold text-orange-5">Наша команда</h2>
            <TeamMembersList />
        </div>
    </q-page>
</template>
