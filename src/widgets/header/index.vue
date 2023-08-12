<template>
    <q-header class="bg-secondary q-pa-sm">
        <q-toolbar class="header q-py-sm bg-primary">
            <div class="header__content">
                <q-toolbar-title>
                    <q-img src="/logo.png" :style="{ width: '80px' }" />
                </q-toolbar-title>
                <div class="header__buttons font-inter-500">
                    <div>
                        <q-btn to="/" label="Главная" class="header__buttons-item" rounded text-color="black" flat />
                    </div>
                    <div class="header__buttons_auth gt-sm">
                        <q-btn
                            to="/register"
                            label="Регистрация"
                            icon="add"
                            class="header__buttons-item header__buttons-item_auth"
                            color="orange-5"
                            text-color="white"
                        />
                        <q-btn
                            to="/signin"
                            label="Войти"
                            icon-right="key"
                            class="header__buttons-item header__buttons-item_auth"
                            color="orange-5"
                            text-color="white"
                        />
                    </div>
                    <div class="lt-md">
                        <q-btn
                            text-color="black"
                            flat
                            dense
                            round
                            icon="menu"
                            aria-label="Menu"
                            @click="toggleLeftDrawer"
                        />
                    </div>
                </div>
            </div>
        </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" bordered>
        <div class="sidebar">
            <q-btn
                v-for="(link, index) in linksToPages"
                :key="index"
                :to="link.to"
                class="text-capitalize font-inter-500"
            >
                {{ link.label }}
            </q-btn>
        </div>
    </q-drawer>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue';

const linksToPages = ref([
    { to: '/', label: 'Главная' },
    { to: '/register', label: 'Регистрация' },
    { to: '/signin', label: 'Войти' },
]);

const leftDrawerOpen = ref(false);
function toggleLeftDrawer(): void {
    leftDrawerOpen.value = !leftDrawerOpen.value;
}

defineComponent({
    name: 'HeaderComponent',
});
</script>

<style lang="scss" scoped>
.header {
    max-width: 1576px;
    margin: 0 auto;
    border-radius: 12px;
    display: flex;

    &__content {
        display: flex;
        flex-basis: 100%;
    }

    &__buttons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        &-item {
            text-transform: capitalize;
            &_auth {
                border-radius: 12px;
                font-weight: 500;
                letter-spacing: 0.2px;
            }
        }
        &_auth {
            display: flex;
            gap: 12px;
            height: fit-content;
        }
    }
}

.sidebar {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 24px 12px;
}
</style>
