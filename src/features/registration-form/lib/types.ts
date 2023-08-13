export interface Country {
    name: string;
    postalCodePattern: string;
}

export interface PasswordValidator {
    isValidLength: boolean;
    isValidCapital: boolean;
    isValidLowercase: boolean;
    isValidDigit: boolean;
    isValid: boolean;
}
