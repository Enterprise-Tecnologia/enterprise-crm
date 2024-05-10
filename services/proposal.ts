import {
    ApiResponseType
} from "@/interfaces/api-response";

const baseUrl = process.env.API_BASE_URL ?? '';

export const postCancellationRmsVerificationToken = async(token: string): Promise<ApiResponseType> => {
    
    const res = await fetch(`${baseUrl}/Proposal/rms/cancellation-term`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        body: JSON.stringify(token)
    });

    if(!res.ok) {
        return {
            success: false,
            message: `Não foi possível localizar o recurso`
        } as ApiResponseType;
    }

    return await res.json() as ApiResponseType;

};
