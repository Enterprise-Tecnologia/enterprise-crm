
export const dateFormatter = (date: Date | string): string => {
    // Garante que a data seja interpretada como local
    let dateObj;
    if (typeof date === 'string') {
        const [year, month, day] = date.split('T')[0].split('-').map(Number);
        dateObj = new Date(year, month - 1, day); // Cria a data como local
    } else {
        dateObj = date;
    }

    // Não aplica offset para manter a data original
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };

    const formatter = new Intl.DateTimeFormat('pt-BR', options);
    return formatter.format(dateObj);
};
