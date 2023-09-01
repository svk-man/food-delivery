import { Router } from 'vue-router';

export async function redirectTo(path: string, router: Router): Promise<void> {
    router.push(`${path}`);
}
