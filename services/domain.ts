import {
    ApiResponseType
} from "../interfaces/api-response";

const baseUrl = process.env.API_BASE_URL ?? '';

export const getDomainByGroup = async(group: string): Promise<ApiResponseType> => {

    const res = await fetch(`${baseUrl}/Domain/group?group=${group}`, {
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
