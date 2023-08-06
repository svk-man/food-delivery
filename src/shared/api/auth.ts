/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import axios, { AxiosResponse } from 'axios';
import 'dotenv/config';

class MyService {
    private token: string = '';

    async getToken(key: string, id: string, secret: string, scope: string): Promise<void> {
        try {
            const response: AxiosResponse = await axios({
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

            this.token = response.data.access_token;
        } catch (error) {
            throw error;
        }
    }

    async setToken(): Promise<void> {
        const key: string | undefined = process.env.SPAPROJECTKEY;
        const id: string | undefined = process.env.SPA_CLIENT_ID;
        const secret: string | undefined = process.env.SPA_CLIENT_SECRET;
        const scope: string | undefined = process.env.SPA_SCOPE;

        if (key && id && secret && scope) {
            await this.getToken(key, id, secret, scope);
        } else {
            throw new Error('Have not env variables, check accessability of env');
        }
    }

    async getProducts(spaProjectKey: string): Promise<AxiosResponse> {
        try {
            const products: AxiosResponse = await axios({
                url: `https://api.us-central1.gcp.commercetools.com/${spaProjectKey}/products`,
                method: 'get',
                headers: { Authorization: `Bearer ${this.token}` },
            });

            return products;
        } catch (error) {
            throw error;
        }
    }
}

const service = new MyService();
service.setToken();
