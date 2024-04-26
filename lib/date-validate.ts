
function validateFormatDataPtBr(data: string): boolean {
    const padraoData = /^(\d{2})\/(\d{2})\/(\d{4})$/;

    return padraoData.test(data);
}

export const isValidDataPtBr = (data: string): boolean => {

    const partes = data.split('/');

    if (partes.length !== 3) {
        return false;
    }

    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1; // Os meses no JavaScript começam do 0
    const ano = parseInt(partes[2], 10);
  
    const dataTeste = new Date(ano, mes, dia);

    return dataTeste.getDate() === dia &&
           dataTeste.getMonth() === mes &&
           dataTeste.getFullYear() === ano;
};