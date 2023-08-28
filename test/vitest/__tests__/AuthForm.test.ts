import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, it, vi } from 'vitest';
import AuthForm from 'src/features/auth-form';
import { createRouterMock, injectRouterMock } from 'vue-router-mock';

installQuasarPlugin();

describe('AuthForm', () => {
    it('should mount correctly', async () => {
        const router = createRouterMock({
            spy: {
                create: (fn) => vi.fn(fn),
                reset: (spy) => spy.mockReset(),
            },
        });
        injectRouterMock(router);

        mount(AuthForm, {});
    });
});
