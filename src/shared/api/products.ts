import axios, { AxiosResponse } from 'axios';

/* https://docs.commercetools.com/api/types#currencycode */
export enum CurrencyCode {
    'RUB',
}

/* https://docs.commercetools.com/api/projects/products#image */
interface Image {
    url: string;
    label: string;
}

/* https://docs.commercetools.com/api/types#typedmoney */
interface TypedMoney {
    centAmount: number;
    currencyCode: CurrencyCode;
    type: string;
    fractionDigits: number;
}

/* https://docs.commercetools.com/api/types#discountedprice */
interface DiscountedPrice {
    value: TypedMoney;
}

/* https://docs.commercetools.com/api/types#ctp:api:type:Price */
interface Price {
    value: TypedMoney;
    discounted: DiscountedPrice;
}

/* https://docs.commercetools.com/api/projects/products#productvariant */
interface ProductVariant {
    images: Image[];
    prices: Price[];
}

/* https://docs.commercetools.com/api/types#localizedstring */
interface LocalizedString {
    [key: string]: string;
}

/* https://docs.commercetools.com/api/projects/products#productdata */
interface ProductData {
    name: LocalizedString;
    description: LocalizedString;
    masterVariant: ProductVariant;
}

/* https://docs.commercetools.com/api/projects/products#productcatalogdata */
interface ProductCatalogData {
    published: boolean;
    current: ProductData;
}

/* https://docs.commercetools.com/api/projects/products#product */
export interface Product {
    id: string;
    masterData: ProductCatalogData;
}

export interface SimplifiedProduct {
    id: string;
    title: string;
    description: string;
    imageSrc: string;
    currencyCode: CurrencyCode;
    price: string;
    discountedPrice?: string;
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
