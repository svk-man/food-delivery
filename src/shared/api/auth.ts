import axios, { AxiosResponse } from 'axios';

export interface Product {
    results: [];
    id: string;
    version: string;
    versionModifiedAt: string;
    lastMessageSequenceNumber: number;
    createdAt: string;
    lastModifiedAt: string;
    lastModifiedBy: object;
    createdBy: object;
    productType: object;
    masterData: {
        current: {
            name: {
                ru: string;
            };
        };
    };
    key: string;
    priceMode: string;
    lastVariantId: number;
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

export async function fetchProducts(key: string, token: string): Promise<Product[] | null> {
    try {
        const response: AxiosResponse<{ results: Product[] }> = await axios({
            url: `https://api.us-central1.gcp.commercetools.com/${key}/products`,
            method: 'get',
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.results;
    } catch (error) {
        return null;
    }
}
