import axios, { AxiosError, AxiosResponse } from 'axios';
import { Notify } from 'quasar';
import { manageToken } from 'src/shared/api/auth';
import { Customer } from '../lib/types';

export default async function handleUserRegistration(data: Customer): Promise<Customer | Error> {
    data.dateOfBirth = `${data.dateOfBirth.replaceAll('/', '-')}`;

    const token = await manageToken();
    try {
        const response: AxiosResponse<Customer> = await axios({
            url: 'https://api.us-central1.gcp.commercetools.com/carrot78/customers',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(data),
        });
        Notify.create('Успешная регистрация! meow~ 🐈🐈');
        return response.data;
    } catch (error) {
        const err = <AxiosError>error;
        return err;
    }
}
