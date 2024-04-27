
const baseUrl = process.env.NEXT_PUBLIC_ROCKDATA_URI ?? '';

export const getPersonData = async(cpf: string): Promise<any> => {

    const res = await fetch(`${baseUrl}${cpf}`, {
        headers: {
            // 'Content-Type': 'application/json',
            'Accept': '*/*'
        }
    });
    
    if(!res.ok) {
        return null;
    }

    return await res.json();
};

export const getPersonTVData = async(cpf: string): Promise<any> => {
    // from techview
    const uri = `https://tv-dev01.azurewebsites.net/v1/Register/customer/${cpf}`;

    const res = await fetch(uri, {
        headers: {
            // 'Content-Type': 'application/json',
            'Accept': '*/*'
        }
    });

    if(!res.ok) {
        return null;
    }

    return await res.json();
};
