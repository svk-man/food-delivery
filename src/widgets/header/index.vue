<template>
    <q-header class="header bg-secondary q-pa-sm">
        <q-toolbar class="header__toolbar q-py-md bg-primary">
            <q-toolbar-title>
                <a class="logo" href="/">
                    <h1 class="logo__text font-inter-900">
                        <span>Food</span>
                        Delivery
                    </h1>
                </a>
            </q-toolbar-title>
            <div class="header__buttons font-inter-500">
                <div class="gt-sm">
                    <q-btn to="/" label="Главная" class="header__buttons-item" rounded text-color="black" flat />
                    <q-btn to="/catalog" label="Каталог" class="header__buttons-item" rounded text-color="black" flat />
                    <q-btn to="/cart" label="Корзина" class="header__buttons-item" rounded text-color="black" flat />
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

    &__toolbar {
        border-radius: 12px;
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

.logo {
    display: inline-block;
    width: 230px;
    text-decoration: none;
    color: $deep-purple-10;
    transition: 0.3s;
    &__text {
        margin: 0;
        font-size: 30px;
        line-height: 35px;
        text-transform: uppercase;
        span {
            color: $orange-5;
        }
    }
    &:hover {
        color: $orange-5;
    }
}

.sidebar {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 24px 12px;
}
</style>
