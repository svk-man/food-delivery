export function isValidPostalCode(pattern: string, postalCode: string): boolean {
    const regexPattern = new RegExp(pattern);

    return regexPattern.test(postalCode);
}
