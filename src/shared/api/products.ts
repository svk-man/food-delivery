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

export const defaultSimplifiedProduct: SimplifiedProduct = {
    id: '',
    title: '',
    description: '',
    imageSrc: '',
    currencyCode: CurrencyCode.RUB,
    price: '',
};

export function getSimplifiedProduct(fetchedProduct: Product): SimplifiedProduct {
    const title = fetchedProduct.masterData.current.name.ru ? fetchedProduct.masterData.current.name.ru : '';
    const description = fetchedProduct.masterData.current.description.ru
        ? fetchedProduct.masterData.current.description.ru
        : '';
    const imageSrc = fetchedProduct.masterData.current.masterVariant.images[0]
        ? fetchedProduct.masterData.current.masterVariant.images[0].url
        : 'image-not-found.png';
    const currencyCode = fetchedProduct.masterData.current.masterVariant.prices[0]
        ? fetchedProduct.masterData.current.masterVariant.prices[0].value.currencyCode
        : CurrencyCode.RUB;

    let price = '';
    if (fetchedProduct.masterData.current.masterVariant.prices[0]?.value) {
        const { centAmount, fractionDigits } = fetchedProduct.masterData.current.masterVariant.prices[0].value;
        price = `${centAmount / 10 ** fractionDigits}`;
    }

    let discountedPrice = '';
    if (fetchedProduct.masterData.current.masterVariant.prices[0]?.discounted) {
        const { centAmount, fractionDigits } =
            fetchedProduct.masterData.current.masterVariant.prices[0].discounted.value;
        discountedPrice = `${centAmount / 10 ** fractionDigits}`;
    }

    return {
        id: fetchedProduct.id,
        title,
        description,
        imageSrc,
        currencyCode,
        price,
        discountedPrice,
    };
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

/* https://docs.commercetools.com/api/projects/products#get-product-by-id */
export async function fetchProduct(key: string, token: string, productId: string): Promise<Product | null> {
    try {
        const response: AxiosResponse<Product> = await axios({
            url: `https://api.us-central1.gcp.commercetools.com/${key}/products/${productId}`,
            method: 'get',
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        return null;
    }
}
