export function isValidName(inputString: string): boolean | string {
    const pattern = /[^a-zA-Zа-яА-ЯёЁ]/;

    if (!inputString || !inputString.length) return 'Обязательное поле';
    if (pattern.test(inputString)) return 'Некорректное значение';

    return true;
}
