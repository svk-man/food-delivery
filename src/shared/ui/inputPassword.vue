<template>
    <div class="password-container">
        <q-input
            label="Пароль"
            type="password"
            outlined
            clearable
            stack-label
            color="accent"
            reactive-rules
            v-model="userPassword"
            :rules="[
                (val) => (val && val.length) || 'Обязательное поле',
                (val) => {
                    if (/[^\u0000-\u007F]/.test(val)) return 'Пароль должен содержать только латинские буквы';
                    if (val.includes(' ')) return 'Не может содержать пробел';
                },
                () => passwordInfo.isValid || 'Пароль не соответствует критериям',
            ]"
            class="signup-form__input text-body1"
        />
        <div v-if="!passwordInfo.isValid" class="signup-form__password-criteria q-pa-sm q-mt-xs">
            <div class="text-subtitle2 q-mb-sm">Требования к паролю:</div>
            <div>
                <q-icon
                    :name="passwordInfo.isValidLength ? 'check_circle' : 'cancel'"
                    :color="passwordInfo.isValidLength ? 'positive' : 'negative'"
                />
                Должен содержать минимум 8 символов
            </div>
            <div>
                <q-icon
                    :name="passwordInfo.isValidCapital ? 'check_circle' : 'cancel'"
                    :color="passwordInfo.isValidCapital ? 'positive' : 'negative'"
                />
                Должен содержать минимум 1 латинскую заглавную букву
            </div>
            <div>
                <q-icon
                    :name="passwordInfo.isValidLowercase ? 'check_circle' : 'cancel'"
                    :color="passwordInfo.isValidLowercase ? 'positive' : 'negative'"
                />
                Должен содержать минимум 1 латинскую строчную букву
            </div>
            <div>
                <q-icon
                    :name="passwordInfo.isValidDigit ? 'check_circle' : 'cancel'"
                    :color="passwordInfo.isValidDigit ? 'positive' : 'negative'"
                />
                Должен содержать минимум 1 цифру
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineComponent, reactive, watch } from 'vue';
import { validatePassword } from '../utils/validatePassword';

const userPassword = ref('');

const passwordInfo = reactive({
    isValidLength: false,
    isValidCapital: false,
    isValidLowercase: false,
    isValidDigit: false,
    isValid: false,
});

const emit = defineEmits(['update:password']);

watch(userPassword, () => {
    Object.assign(passwordInfo, validatePassword(userPassword.value));
    if (passwordInfo.isValid) emit('update:password', userPassword.value);
});
defineComponent({
    name: 'InputPassword',
});
</script>

<style lang="scss" scoped>
.signup-form__password-criteria {
    background-color: $secondary;
    border-radius: 12px;
}
</style>
