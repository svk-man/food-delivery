<template>
    <q-page padding>
        <h3>Главная</h3>
        <div class="links">
            <q-btn to="/catalog" label="Каталог" class="header__buttons-item" rounded text-color="black" flat />
            <q-btn to="/cart" label="Корзина" class="header__buttons-item" rounded text-color="black" flat />
            <q-btn to="/register" label="Регистрация" class="header__buttons-item" rounded text-color="black" flat />
            <q-btn to="/signin" label="Войти" class="header__buttons-item" rounded text-color="black" flat />
        </div>
    </q-page>
</template>

<script lang="ts" setup>
import { getTokenFromCookies, auth } from 'src/shared/api/auth';
import { defineComponent, onMounted } from 'vue';

async function getToken(): Promise<void> {
    const token = getTokenFromCookies();
    if (!token) {
        await auth();
    }
}

onMounted(getToken);
defineComponent({
    name: 'IndexPage',
});
</script>
<style lang="scss" scoped>
.links {
    display: flex;
    flex-direction: column;
    align-items: start;
}
</style>
