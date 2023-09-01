<template>
    <q-page>
        <div class="container">
            <h2>Главная</h2>
            <div class="links">
                <q-btn to="/catalog" label="Каталог" class="header__buttons-item" rounded text-color="black" flat />
                <q-btn to="/cart" label="Корзина" class="header__buttons-item" rounded text-color="black" flat />
                <q-btn
                    v-if="!isUserAuthenticated"
                    to="/register"
                    label="Регистрация"
                    class="header__buttons-item"
                    rounded
                    text-color="black"
                    flat
                />
                <q-btn
                    v-if="!isUserAuthenticated"
                    to="/signin"
                    label="Войти"
                    class="header__buttons-item"
                    rounded
                    text-color="black"
                    flat
                />
                <q-btn
                    v-else
                    @click="logout"
                    label="Выйти"
                    class="header__buttons-item"
                    rounded
                    text-color="black"
                    flat
                />
            </div>
        </div>
    </q-page>
</template>

<script lang="ts" setup>
import { computed, defineComponent } from 'vue';
import { useUserStore } from 'src/app/store/user';
import { removeToken } from 'src/shared/api/auth';
import { useRouter } from 'vue-router';

defineComponent({
    name: 'IndexPage',
});

const userStore = useUserStore();
const router = useRouter();

const isUserAuthenticated = computed(() => userStore.isAuthenticated);

const logout = (): void => {
    removeToken();
    userStore.setIsAuthenticated(false);
    router.push('/signin');
};
</script>

<style lang="scss" scoped>
.links {
    display: flex;
    flex-direction: column;
    align-items: start;
}
</style>
