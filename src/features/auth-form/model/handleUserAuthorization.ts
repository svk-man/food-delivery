import axios, { AxiosResponse } from 'axios';
import { Notify } from 'quasar';
import { useUserStore } from 'src/app/store/user';
import { saveTokenToCookies } from 'src/shared/api/auth';
import { redirectTo } from 'src/shared/api/redirect';
import { Router } from 'vue-router';
import { Customer } from '../../registration-form/lib/types';

export interface MyCustomerSignin {
    email: string;
    password: string;
}
export interface CustomerSignInResult {
    customer: Customer;
}

export interface PasswordFlowData {
    access_token: string;
    expires_in: string;
    refresh_token: string;
    scope: string;
    token_type: string;
}

export interface PasswordFlowError {
    response: {
        data: {
            error: string;
            error_description: string;
            message: string;
            statusCode: number;
        };
    };
}

export async function fetchTokenWithPasswordFlow(
    password: string,
    email: string
): Promise<PasswordFlowData | PasswordFlowError> {
    const id: string = import.meta.env.VITE_SPA_CLIENT_ID;
    const secret: string = import.meta.env.VITE_SPA_CLIENT_SECRET;
    const scope: string = import.meta.env.VITE_SPA_SCOPE;

    try {
        const response: AxiosResponse<PasswordFlowData> = await axios({
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

        return response.data;
    } catch (error) {
        const PasswordFlowErr = error as PasswordFlowError;
        const responseErrorCode = PasswordFlowErr.response.data.error;

        let message;
        if (responseErrorCode === 'invalid_customer_account_credentials') {
            message = 'Неверный логин или пароль, пожалуйста, попробуйте ввести заново! 🐇';
        }

        Notify.create({ message, icon: 'warning_amber' });
        return PasswordFlowErr;
    }
}

export interface LoginOption {
    email: string;
    password: string;
    access_token?: string;
}

export default async function login(option: LoginOption): Promise<void> {
    try {
        await axios({
            url: 'https://api.us-central1.gcp.commercetools.com/carrot78/me/login',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${option.access_token}`,
            },
            data: JSON.stringify({ email: option.email, password: option.password }),
        });
        Notify.create('Успешный вход! meow~ 🐈🐈');
    } catch (error) {
        Notify.create('Произошла серверная ошибка, пожалуйста, попробуйте ещё раз через несколько минут!');
    }
}

export async function loginHandler(option: LoginOption, router: Router): Promise<void> {
    const userToken = await fetchTokenWithPasswordFlow(option.password, option.email);
    const isUserTokenExist = 'access_token' in userToken;

    if (isUserTokenExist) {
        saveTokenToCookies(userToken.access_token);

        const loginOption = {
            email: option.email,
            password: option.password,
            access_token: userToken.access_token,
        };

        await login(loginOption);

        const userStore = useUserStore();
        userStore.setIsAuthenticated(true);

        await redirectTo('/', router);
    }
}
