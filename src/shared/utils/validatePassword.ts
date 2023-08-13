import { PasswordValidator } from '../../features/registration-form/lib/types';

export function validatePassword(password: string | null): PasswordValidator {
    const isCorrectLength = password ? password.length >= 8 : false;
    const isIncludesCapital = password ? /[A-Z]/.test(password) : false;
    const isIncludesLower = password ? /[a-z]/.test(password) : false;
    const isIncludesDigit = password ? /\d/.test(password) : false;

    return {
        isValidLength: isCorrectLength,
        isValidCapital: isIncludesCapital,
        isValidLowercase: isIncludesLower,
        isValidDigit: isIncludesDigit,
        isValid: isCorrectLength && isIncludesCapital && isIncludesLower && isIncludesDigit,
    };
}
