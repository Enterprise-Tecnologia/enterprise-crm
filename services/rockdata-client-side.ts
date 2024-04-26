
const baseUrl = process.env.NEXT_PUBLIC_ROCKDATA_URI ?? '';

export const getPersonData = async(cpf: string): Promise<any> => {

    const res = await fetch(`${baseUrl}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        }
    });
    
    if(!res.ok) {
        return null;
    }
    
    return await res.json();
};
