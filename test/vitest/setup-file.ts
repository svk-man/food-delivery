// This file will be run before each test file

// Mocking Vue Router
import { beforeEach } from 'vitest';
import { createRouterMock, injectRouterMock, VueRouterMock, RouterMockOptions } from 'vue-router-mock';
import { config } from '@vue/test-utils';

// https://github.com/posva/vue-router-mock
export function installRouter(options?: RouterMockOptions): void {
    beforeEach(() => {
        const router = createRouterMock(options);
        injectRouterMock(router);
    });

    config.plugins.VueWrapper.install(VueRouterMock);
}
