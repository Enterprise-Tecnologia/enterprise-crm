
const baseUrl = process.env.NEXT_PUBLIC_VIACEP_URI ?? '';

export const getAddressByCEP = async(cep: string): Promise<any> => {

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