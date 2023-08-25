import axios, { AxiosResponse } from 'axios';
import { Notify } from 'quasar';
import { Customer } from '../../registration-form/lib/types';

export interface MyCustomerSignin {
    email: string;
    password: string;
}
export interface CustomerSignInResult {
    customer: Customer;
}

export interface PasswordFlowReturned {
    access_token: string;
    expires_in: string;
    refresh_token: string;
    scope: string;
    token_type: string;
}

export interface PasswordFlowError {
    response: {
        data: {
            error_description: string;
            message: string;
            statusCode: number;
        };
    };
}

export async function fetchTokenWithPasswordFlow(
    password: string,
    email: string
): Promise<PasswordFlowReturned | null> {
    const id: string = import.meta.env.VITE_SPA_CLIENT_ID;
    const secret: string = import.meta.env.VITE_SPA_CLIENT_SECRET;
    const scope: string = import.meta.env.VITE_SPA_SCOPE;

    try {
        const response: AxiosResponse<PasswordFlowReturned> = await axios({
            url: 'https://auth.us-central1.gcp.commercetools.com/oauth/carrot78/customers/token',
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${btoa(`${id}:${secret}`)}`,
            },
            params: {
                grant_type: 'password',
                username: email,
                password,
                scope,
            },
        });
        Notify.create('Ваш токен сгенерирован! ~ 🌱');

        return response.data;
    } catch (error: unknown) {
        const PasswordFlowErr = error as PasswordFlowError;
        const responseMessage = PasswordFlowErr.response.data.message;

        let message;
        if (responseMessage === 'Customer account with the given credentials not found.') {
            message = 'Неверный логин или пароль, пожалуйста, попробуйте ввести заново! 🐇';
        }

        Notify.create({ message, icon: 'warning_amber' });
        return null;
    }
}

export default async function handleUserAuthorization(password: string, email: string): Promise<void | null> {
    const data: MyCustomerSignin = { email, password };

    const tokenWithExpireTime = await fetchTokenWithPasswordFlow(password, email);
    if (!tokenWithExpireTime) return null;

    try {
        const response: AxiosResponse<undefined | null> = await axios({
            url: 'https://api.us-central1.gcp.commercetools.com/carrot78/me/login',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenWithExpireTime.access_token}`,
            },
            data: JSON.stringify(data),
        });
        Notify.create('Успешный вход! meow~ 🐈🐈');

        return Promise.resolve();
    } catch (error) {
        return null;
    }
}
