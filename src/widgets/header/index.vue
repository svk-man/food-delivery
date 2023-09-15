<template>
    <q-header class="header bg-secondary q-py-sm">
        <div class="container">
            <q-toolbar class="header__toolbar q-py-md bg-primary">
                <q-toolbar-title>
                    <q-btn class="logo" to="/" unelevated>
                        <h1 class="logo__text font-inter-900">
                            <span>Food</span>
                            Delivery
                        </h1>
                    </q-btn>
                </q-toolbar-title>
                <div class="header__buttons font-inter-500">
                    <div class="gt-sm">
                        <q-btn to="/catalog" label="Каталог" class="button" rounded text-color="black" flat />
                        <q-btn to="/cart" label="Корзина" class="button" rounded text-color="black" flat />
                    </div>
                    <div class="header__buttons_auth gt-sm">
                        <q-btn
                            v-if="!isUserAuthenticated"
                            to="/register"
                            label="Регистрация"
                            icon="add"
                            class="button"
                            color="orange-5"
                            text-color="white"
                        />
                        <q-btn
                            v-if="!isUserAuthenticated"
                            to="/signin"
                            label="Войти"
                            icon-right="key"
                            class="header__buttons-item header__buttons-item_auth"
                            color="orange-5"
                            text-color="white"
                        />
                        <q-btn
                            v-if="isUserAuthenticated"
                            to="/profile"
                            label="Профиль"
                            class="button"
                            rounded
                            text-color="black"
                            flat
                        />
                        <q-btn
                            v-if="isUserAuthenticated"
                            to="/signin"
                            @click="logout"
                            label="Выйти"
                            icon-right="logout"
                            class="button"
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
        </div>
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
            <q-btn v-if="isUserAuthenticated" @click="logout" class="text-capitalize font-inter-500">Выйти</q-btn>
        </div>
    </q-drawer>
</template>

<script lang="ts" setup>
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { useUserStore } from 'src/app/store/user';
import { isAuthenticated, removeToken } from 'src/shared/api/auth';
import { useRouter } from 'vue-router';

const linksToPages = ref([] as { to: string; label: string }[]);

const leftDrawerOpen = ref(false);
function toggleLeftDrawer(): void {
    leftDrawerOpen.value = !leftDrawerOpen.value;
}

const userStore = useUserStore();
const router = useRouter();

const isUserAuthenticated = computed(() => userStore.isAuthenticated);

onMounted(() => {
    userStore.setIsAuthenticated(isAuthenticated());
});

watch(isUserAuthenticated, (value) => {
    linksToPages.value = !value
        ? [
              { to: '/register', label: 'Регистрация' },
              { to: '/signin', label: 'Войти' },
          ]
        : [
              { to: '/catalog', label: 'Каталог' },
              { to: '/cart', label: 'Корзина' },
              { to: '/profile', label: 'Профиль' },
          ];
});

const logout = (): void => {
    removeToken();
    userStore.setIsAuthenticated(false);
    router.push('/signin');
};

defineComponent({
    name: 'HeaderComponent',
});
</script>

<style lang="scss" scoped>
.header {
    &__toolbar {
        border-radius: 12px;
    }

    &__buttons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        &_auth {
            display: flex;
            gap: 12px;
            height: fit-content;
        }
    }
}

.logo {
    display: inline-block;
    width: 240px;
    padding: 0;
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
