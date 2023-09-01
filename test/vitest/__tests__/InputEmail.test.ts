import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import InputEmail from 'src/shared/ui/inputEmail.vue';

installQuasarPlugin();

async function checkInputEmail(value: string, expectedMessage: string = ''): Promise<void> {
    const wrapper = mount(InputEmail, {});

    const label = wrapper.find('label[for="email"]');
    expect(label.exists()).toBe(true);

    const input = label.find('input');
    expect(input.exists()).toBe(true);

    await input.setValue(value);
    await wrapper.vm.$refs.email.validate();

    const errorMessage = label.find(`.q-field__messages${expectedMessage ? ' div' : ''}`);
    expect(errorMessage.exists()).toBe(true);

    expect(errorMessage.text()).toBe(expectedMessage);
}

/* eslint-disable max-lines-per-function */
describe('InputEmail', () => {
    it('Монтирование компонента.', async () => {
        mount(InputEmail, {});
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
