import {
    ApiResponseType
} from "@/interfaces/api-response";

// const baseUrl = `https://enterprise-crm-api.azurewebsites.net/v1`;
const baseUrl = `https://localhost:7013/v1`;

export const getProductBySlug = async(slug: string): Promise<ApiResponseType> => {

    const res = await fetch(`${baseUrl}/Product/${slug}/slug`, {
        headers: {
            'Accept': '*/*',
            // 'x-api-key': `${integrationApíKey}`,
            //'User-Agent' : 'XCurve v.0.12042024',
        }
    });
    
    if(!res.ok) {
        return {
            success: false,
            message: `Não foi possível localizar o recurso`
        } as ApiResponseType;
    }
    
    return await res.json() as ApiResponseType;

};