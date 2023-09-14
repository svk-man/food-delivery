export function isValidDate(date: string): boolean | string {
    if (!date.length) return 'Обязательное поле';

    const dateObject = new Date(date.replaceAll('-', '/'));
    const currentDate = new Date();
    if (!dateObject.getDate() || dateObject.getTime() > Date.now()) return 'Некорректная дата';

    const ageDifference = currentDate.getFullYear() - dateObject.getFullYear();
    if (ageDifference < 13) return 'Минимальный возраст для регистрации 13 лет';

    return true;
}
