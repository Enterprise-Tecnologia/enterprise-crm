
export const dateTimeFormatter = (code: Date) => {

    const option = {
        timeZone: 'America/Sao_Paulo', // Lista de Timezones no fim do artigo
        // hour12: true,
        dateStyle: 'medium', 
        timeStyle: 'medium'
    };
    
    const locale = 'pt-BR';
    

    // return formatter.format(code);

    // const result = code.toISOString().match(/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}/)[0].split('-').reverse().join('/')

    // return code.toISOString().substr(0, 10).split('-').reverse().join('/');
    const myBrazilianDate = code.toLocaleString(locale);
    // return code.toLocaleDateString(locale, option);
    // return new Intl.DateTimeFormat(locale, {year: '2-digit'}).format(code)

    return myBrazilianDate;
};
