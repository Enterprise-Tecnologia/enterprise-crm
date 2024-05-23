
import {
    ApiResponseType
} from "@/interfaces/api-response";
import { ApiResponsePageType } from "@/interfaces/api-response-paging";

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
            message: `Não foi possível efetuar a transação`
        } as ApiResponseType;
    }

    return await res.json() as ApiResponseType;

};

export const getProposals = async(
    page:number, size: number
): Promise<ApiResponseType> => {
    
    const res = await fetch(`${baseUrl}/Proposal`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
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

export const getCotacoes = async(
    page:number = 1, limit: number = 10
): Promise<ApiResponsePageType> => {

    const res = await fetch(`${baseUrl}/Proposal/lead?page=${page}&limit=${limit}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        }
    });

    if(!res.ok) {
        return {
            totalCount: 0,
            page: page,
            pageSize: limit
        } as ApiResponsePageType;
    }

    return await res.json() as ApiResponsePageType;

};

export const getCotacao = async(uid: string): Promise<ApiResponseType> => {
    
    const res = await fetch(`${baseUrl}/Proposal/lead/${uid}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
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
