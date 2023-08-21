export interface Country {
    postalCodePattern: string;
    name: string;
    postalCodePatternShipping?: string;
    postalCodePatternBilling?: string;
}

export interface PasswordValidator {
    isValidLength: boolean;
    isValidCapital: boolean;
    isValidLowercase: boolean;
    isValidDigit: boolean;
    isValid: boolean;
}

export interface Address {
    key?: string;
    title?: string;
    salutation?: string;
    firstName: string;
    lastName: string;
    streetName: string;
    streetNumber?: string;
    additionalStreetInfo?: string;
    postalCode: string;
    city: string;
    region?: string;
    state?: string;
    country: string;
    company?: string;
    department?: string;
    building?: string;
    apartment?: string;
    pOBox?: string;
    phone?: string;
    mobile?: string;
    email: string;
    fax?: string;
    additionalAddressInfo?: string;
    externalId?: string;
}

export interface Customer {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    title?: string;
    salutation?: string;
    dateOfBirth: string;
    companyName?: 'string';
    vatId?: string;
    addresses: Address[];
    defaultShippingAddress?: number;
    defaultBillingAddress?: number;
    locale?: string;
}
