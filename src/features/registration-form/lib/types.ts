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

export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    city: string;
    street: string;
    password: string;
}
