import axios, { AxiosResponse } from 'axios';
import { Notify } from 'quasar';
import { auth, getTokenFromCookies } from 'src/shared/api/auth';
import { UserData } from '../lib/types';

export interface Customer {
    addresses: [];
    email: string;
    firstName: string;
    id: string;
    isEmailVerified: boolean;
    lastName: string;
    password: string;
    version: number;
    createdAt: string;
    lastModifiedAt: string;
    authenticationMode: 'Password';
}

export default async function handleUserRegistration(data: UserData): Promise<void | null> {
    data.dateOfBirth = `${data.dateOfBirth.replaceAll('/', '-')}`;

    const token = getTokenFromCookies();

    if (!token) {
        await auth();
    }
    try {
        const response: AxiosResponse<{ results: Customer | undefined }> = await axios({
            url: 'https://api.us-central1.gcp.commercetools.com/carrot78/customers',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(data),
        });
        Notify.create('Успешная регистрация! meow~ 🐈🐈');
        return Promise.resolve();
    } catch (error) {
        return null;
    }
}
