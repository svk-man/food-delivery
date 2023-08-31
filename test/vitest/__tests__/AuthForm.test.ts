import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, it, vi, expect } from 'vitest';
import AuthForm from 'src/features/auth-form';
import { createRouterMock, injectRouterMock } from 'vue-router-mock';

installQuasarPlugin();

async function checkInputPassword(value: string, expectedMessage: string = ''): Promise<void> {
    const wrapper = mount(AuthForm, {});

    const label = wrapper.find('label[for="password"]');
    expect(label.exists()).toBe(true);

    const input = label.find('input');
    expect(input.exists()).toBe(true);

    await input.setValue(value);
    await wrapper.vm.$refs.password.validate();

    const errorMessage = label.find(`.q-field__messages${expectedMessage ? ' div' : ''}`);
    expect(errorMessage.exists()).toBe(true);

    expect(errorMessage.text()).toBe(expectedMessage);
}

/* eslint-disable max-lines-per-function */
describe('AuthForm', () => {
    const router = createRouterMock({
        spy: {
            create: (fn) => vi.fn(fn),
            reset: (spy) => spy.mockReset(),
        },
    });
    injectRouterMock(router);

    it('Монтирование компонента.', async () => {
        mount(AuthForm, {});
    });

    it(`Правила валидации Password.
    Пароль должен состоять не менее чем из 8 символов.
    Пустой пароль.`, async () => {
        checkInputPassword('', 'Обязательное поле');
    });

    it(`Правила валидации Password.
    Пароль должен состоять не менее чем из 8 символов.
    Пароль из 7 символов.`, async () => {
        checkInputPassword('Abcde12', 'Не может быть короче 8 символов');
    });

    it(`Правила валидации Password.
    Пароль должен содержать хотя бы одну заглавную букву (A-Z).
    Пароль не содержит ни одной заглавной буквы.`, async () => {
        checkInputPassword('abcdeabcde', 'Должен содержать минимум 1 латинскую заглавную букву');
    });

    it(`Правила валидации Password.
    Пароль должен содержать хотя бы одну строчную букву (a-z).
    Пароль не содержит ни одной строчной буквы.`, async () => {
        checkInputPassword('ABCDEABCDE', 'Должен содержать минимум 1 латинскую строчную букву');
    });

    it(`Правила валидации Password.
    Пароль должен содержать хотя бы одну цифру (0-9).
    Пароль не содержит ни одной цифры.`, async () => {
        checkInputPassword('AbcdeAbcde', 'Должен содержать минимум 1 цифру');
    });

    it(`Правила валидации Password.
    Пароль не должен содержать пробелов в начале или конце строки.
    Пробелы в начале пароля.`, async () => {
        checkInputPassword(' AbcdeAbcde123', 'Не может содержать пробел');
    });

    it(`Правила валидации Password.
    Пароль не должен содержать пробелов в начале или конце строки.
    Пробелы в конце пароля.`, async () => {
        checkInputPassword('AbcdeAbcde123 ', 'Не может содержать пробел');
    });

    it(`Правила валидации Password.
    Пароль должен содержать только латинские буквы.
    Пароль с кириллицей.`, async () => {
        checkInputPassword('AbcdИeAbcde123', 'Должен содержать только латинские буквы');
    });
});
