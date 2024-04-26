export const isCreditCardNumberValid = (creditCard: String): boolean => {
    var isValid = false;

    creditCard = creditCard.replace(/\D/g, '');

    if (typeof creditCard !== 'string') return isValid;
    
    const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    const amexpRegEx = /^(?:3[47][0-9]{13})$/;
    const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
  
    if (visaRegEx.test(creditCard)) {
        isValid = true;
    } else if(mastercardRegEx.test(creditCard)) {
        isValid = true;
    } else if(amexpRegEx.test(creditCard)) {
        isValid = true;
    } else if(discovRegEx.test(creditCard)) {
        isValid = true;
    }

    return isValid;
};

export const isCreditCardExpirationValid = (expiration: String): boolean => {
    
    if (typeof expiration !== 'string' || expiration.length < 5) return false;

    const securityDate = expiration.split('/');
    
    const month = +securityDate[0];
    const year = +securityDate[1];
    const currentYear = new Date().getFullYear()-2000;
    const currentMonth = new Date().getMonth() +1;

    if(currentYear === year && currentMonth > month) return false;

    const validMonth = month >= 1 && month < 13;
    const validYear = year >= currentYear && year < currentYear + 10;

    return validMonth && validYear;
};

export const isCreditCardSecurityValid = (creditCard: String): boolean => {

    if (typeof creditCard !== 'string') return false;

    return !isNaN(+creditCard);
};
