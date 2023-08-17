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
