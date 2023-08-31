<template>
    <q-form @submit="loginHandlerFunc" class="signin-form">
        <h2 class="signin-form__title q-ma-none q-mb-md">Авторизация</h2>
        <input-email @update:email="(email: string) => (userEmail = email)" />
        <q-input
            label="Пароль*"
            :type="isPassword ? 'password' : 'text'"
            outlined
            clearable
            stack-label
            color="accent"
            reactive-rules
            v-model="userPassword"
            :rules="[
                (val: string) => {
                    if (!(val && val.length)) return 'Обязательное поле';
                    if (val.includes(' ')) return 'Не может содержать пробел';
                    if (/[^\u0000-\u007F]/.test(val)) return 'Должен содержать только латинские буквы';
                    if (!/[a-z]/.test(val)) return 'Должен содержать минимум 1 латинскую строчную букву';
                    if (!/[A-Z]/.test(val)) return 'Должен содержать минимум 1 латинскую заглавную букву';
                    if (!/\d/.test(val)) return 'Должен содержать минимум 1 цифру';
                    if (val.length < 8) return 'Не может быть короче 8 символов';

                    return true;
                },
            ]"
            class="signin-form__input text-body1"
        >
            <template v-slot:append>
                <q-icon
                    :name="isPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPassword = !isPassword"
                />
            </template>
        </q-input>
        <q-btn
            label="Войти"
            type="submit"
            push
            padding="md"
            color="positive"
            class="full-width font-inter-500 signin-form__btn"
        />
        <q-btn
            to="/register"
            label="Зарегистрироваться"
            push
            padding="md"
            color="positive"
            class="full-width font-inter-500 signin-form__btn"
        />
    </q-form>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import InputEmail from 'src/shared/ui/inputEmail.vue';
import { loginHandler } from 'src/features/auth-form/model/handleUserAuthorization';

const router = useRouter();

const userPassword = ref('');
const userEmail = ref('');
const isPassword = ref(true);

const loginHandlerFunc = async (): Promise<void> => {
    const password = `${userPassword.value}`;
    const email = `${userEmail.value}`;

    await loginHandler({ password, email }, router);
};

defineComponent({
    name: 'AuthForm',
});
</script>

<style lang="scss" scoped>
.signin-form {
    max-width: 640px;
    margin: auto;
    padding: 24px;
    background-color: $primary;
    border-radius: 16px;

    &__input {
        margin-top: 5px;
    }
    &__btn {
        margin-top: 5px;
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
    }
}
</style>
