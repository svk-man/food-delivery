export function isValidName(inputString: string): boolean | string {
    const pattern = /[^a-zA-Zа-яА-ЯёЁ]/;

    return !inputString.length ? 'Обязательное поле' : pattern.test(inputString) ? 'Некорректное значение' : true;
}
