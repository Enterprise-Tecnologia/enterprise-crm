
export const dateTimeFormatter = (date: Date | string): string => {
    // Converte para um objeto Date caso receba uma string
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    // Ajusta a data para o fuso horário de Brasília manualmente
    const brasiliaOffset = -3; // UTC-3
    const localDate = new Date(dateObj.getTime() + brasiliaOffset * 60 * 60 * 1000);

    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Usa o formato 24 horas
    };

    const formatter = new Intl.DateTimeFormat('pt-BR', options);

    // Divide o resultado em partes para ajustar o formato desejado
    const parts = formatter.formatToParts(localDate);
    const formattedDate = `${parts.find(p => p.type === 'day')?.value}/${parts.find(p => p.type === 'month')?.value}/${parts.find(p => p.type === 'year')?.value}`;
    const formattedTime = `${parts.find(p => p.type === 'hour')?.value}:${parts.find(p => p.type === 'minute')?.value}:${parts.find(p => p.type === 'second')?.value}`;

    return `${formattedDate} ${formattedTime}`;
};
