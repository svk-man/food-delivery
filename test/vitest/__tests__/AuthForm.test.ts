import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, it, vi, expect } from 'vitest';
import AuthForm from 'src/features/auth-form';
import { createRouterMock, injectRouterMock } from 'vue-router-mock';

installQuasarPlugin();

async function checkInputEmail(value: string, expectedMessage: string = ''): Promise<void> {
    const wrapper = mount(AuthForm, {});

    const labelEmail = wrapper.find('label[for="email"]');
    expect(labelEmail.exists()).toBe(true);

    const inputEmail = labelEmail.find('input');
    expect(inputEmail.exists()).toBe(true);

    inputEmail.setValue(value);

    await wrapper.trigger('submit');

    const errorMessage = labelEmail.find(`.q-field__messages${expectedMessage ? ' div' : ''}`);
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

    it(`Правила валидации Email.
      Адрес email должен быть правильно оформлен (например, user@example.com).
      Некорректный email.`, async () => {
        checkInputEmail('user_example_com', 'Некорректный Email');
    });

    it(`Правила валидации Email.
    Адрес email должен быть правильно оформлен (например, user@example.com).
    Корректный email.`, async () => {
        checkInputEmail('user@example.com');
    });

    it(`Правила валидации Email.
    В адресе email не должно быть пробельных символов в начале или в конце строки.
    Пробелы в начале строки.`, async () => {
        checkInputEmail(' user@example.com', 'Некорректный Email');
    });

    it(`Правила валидации Email.
    В адресе email не должно быть пробельных символов в начале или в конце строки.
    Пробелы в конце строки.`, async () => {
        checkInputEmail('user@example.com ', 'Некорректный Email');
    });

    it(`Правила валидации Email.
    Адрес email должен содержать доменное имя (например, example.com).
    Отсутствие доменного имени.`, async () => {
        checkInputEmail('user@', 'Некорректный Email');
    });

    it(`Правила валидации Email.
    Адрес email должен содержать символ "@", разделяющий локальную часть и доменное имя.
    Отсутствие доменного имени.`, async () => {
        checkInputEmail('userexample.com', 'Некорректный Email');
    });
});
