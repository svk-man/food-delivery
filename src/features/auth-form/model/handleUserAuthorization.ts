import axios, { AxiosResponse } from 'axios';
import { Notify } from 'quasar';
import { manageToken } from 'src/shared/api/auth';
import { Customer } from '../../registration-form/lib/types';

export interface MyCustomerSignin {
    email: string;
    password: string;
}
export interface CustomerSignInResult {
    customer: Customer;
}

export default async function handleUserAuthorization(password: string, email: string): Promise<void | null> {
    const data: MyCustomerSignin = { email, password };
    const token = await manageToken();
    try {
        const response: AxiosResponse<{ results: CustomerSignInResult | undefined }> = await axios({
            url: 'https://api.us-central1.gcp.commercetools.com/carrot78/me/login',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(data),
        });
        Notify.create('Успешный вход! meow~ 🐈🐈');
        return Promise.resolve();
    } catch (error) {
        return null;
    }
}
