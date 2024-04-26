'use client';

import {
    ApiResponseType
} from "../interfaces/api-response";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URI ?? '';

export const postAddLead = async(data: object): Promise<ApiResponseType> => {

    const res = await fetch(`${baseUrl}/Proposal/lead`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        body: JSON.stringify(data)
    });
    
    if(!res.ok) {
        return {
            success: false,
            message: `Não foi possível localizar o recurso`
        } as ApiResponseType;
    }
    
    return await res.json() as ApiResponseType;
};
