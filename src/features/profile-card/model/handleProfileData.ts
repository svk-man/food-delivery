import axios from 'axios';
import { Notify } from 'quasar';

interface CustomerData {
    id: string;
    version: number;
    key: string;
    customerNumber: string;
    externalId: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    middleName: string;
    title: string;
    dateOfBirth: Date;
    companyName: string;
    vatId: string;
    addresses: [];
    defaultShippingAddressId: string;
    shippingAddressIds: string[];
    defaultBillingAddressId: string;
    billingAddressIds: string[];
    isEmailVerified: boolean;
    customerGroup: object;
    locale: string;
    salutation: string;
    stores: [];
    authenticationMode: string;
    custom: object;
    createdAt: Date;
    createdBy: object;
    lastModifiedAt: Date;
    lastModifiedBy: object;
}

export default async function getCustomerData(accessToken: string): Promise<CustomerData> {
    try {
        const response = await axios({
            url: 'https://api.us-central1.gcp.commercetools.com/carrot78/me',
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        Notify.create('данные юзера - получены! ура!');
        return response.data;
    } catch (error) {
        Notify.create('Ошибка при получении данных юзера, перезагрузи стр-цу о: ');
        throw new Error('Ошибка получения данных юзера');
    }
}

interface Action {
    action: string;
    [key: string]: string;
}
interface SetCustomerData {
    version: number;
    actions: Action[];
}

export async function setCustomerData(accessToken: string, data: SetCustomerData): Promise<CustomerData> {
    try {
        const response = await axios({
            url: 'https://api.us-central1.gcp.commercetools.com/carrot78/me',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            data: JSON.stringify(data),
        });
        Notify.create('данные юзера - обновлены! ура!');
        return response.data;
    } catch (error) {
        Notify.create('Ошибка при обновлении данных юзера, попробуй ещё раз!');
        throw new Error('Ошибка обновления данных юзера');
    }
}
