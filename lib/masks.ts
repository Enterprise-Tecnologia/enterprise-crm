
export const normalizePhoneNumber = (value: String | undefined) => {
    
    if (!value) return '';

    return value.replace(/[\D]/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})(\d+?)/, '$1');
};

export const normalizeCnpjNumber = (value: String | undefined) => {
    
    if (!value) return '';

    return value.replace(/[\D]/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
};

export const normalizeCpfNumber = (value: String | undefined):string => {
    
    if (!value) return '';

    return value.replace(/[\D]/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
};

export const normalizeCepNumber = (value: String | undefined) => {

    if (!value) return '';

    return value.replace(/\D/g, '')
        .replace(/^(\d{5})(\d{3})+?$/, '$1-$2')
        .replace(/(-\d{3})(\d+?)/, '$1');
};

export const normalizeDate = (value: String | undefined) => {

    if (!value) return '';

    return value.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(-\d{3})(\d+?)/, '$1');
};

export const normalizeCardNumber = (value: String | undefined) => {

    if (!value) return '';

    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || '';
    var parts = [];

    for (let i=0, len=match.length; i<len; i+=4) {
        parts.push(match.substring(i, i+4));
    }

    if (parts.length) {
        return parts.join(' ');
    } else {
        return value;
    }
};

export const normalizeExpiresCard = (value: String | undefined) => {
    // (0[1-9]|1[0-2])\/?(([0-9]{4})|[0-9]{2}$)
    if (!value) return '';

    return value.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        //.replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(-\d{3})(\d+?)/, '$1');
};
