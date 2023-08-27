import axios, { AxiosResponse } from 'axios';
import { Cookies } from 'quasar';

export function getTokenFromCookies(): string {
    return Cookies.get('auth_token');
}

export function saveTokenToCookies(bearerToken: string): void {
    Cookies.set('auth_token', bearerToken);
}

export function removeTokenFromCookies(): void {
    Cookies.remove('auth_token');
}

export async function fetchAccessToken(id: string, secret: string, scope: string): Promise<string | null> {
    try {
        const response: AxiosResponse<{ access_token: string }> = await axios({
            url: 'https://auth.us-central1.gcp.commercetools.com/oauth/token',
            method: 'post',
            params: {
                grant_type: 'client_credentials',
                scope: `${scope}`,
            },
            auth: {
                username: id,
                password: secret,
            },
        });

        return response.data.access_token;
    } catch (error) {
        return null;
    }
}

export async function auth(): Promise<void> {
    const isTokenExist = getTokenFromCookies();

    if (!isTokenExist) {
        const id: string = import.meta.env.VITE_SPA_CLIENT_ID;
        const secret: string = import.meta.env.VITE_SPA_CLIENT_SECRET;
        const scope: string = import.meta.env.VITE_SPA_SCOPE;

        const token = `${await fetchAccessToken(id, secret, scope)}`;
        if (token) {
            saveTokenToCookies(token);
        }
    }
}

export function isAuthenticated(): boolean {
    const token = getTokenFromCookies();

    return !(!token || token === 'null');
}

export async function manageToken(): Promise<string> {
    if (!isAuthenticated()) {
        await auth();
    }

    return getTokenFromCookies();
}

export function removeToken(): void {
    removeTokenFromCookies();
}
