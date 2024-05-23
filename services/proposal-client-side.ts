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

export const postCreatePDFDocument = async(proposalUid: string): Promise<ApiResponseType> => {

    const res = await fetch(`${baseUrl}/Proposal/rms/proposal-term`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        body: JSON.stringify(proposalUid)
    });
    
    if(!res.ok) {
        return {
            success: false,
            message: `Não foi possível localizar o recurso`
        } as ApiResponseType;
    }
    
    return await res.json() as ApiResponseType;
};

export const postProposalRms = async(uid: string): Promise<ApiResponseType> => {
    
    const res = await fetch(`${baseUrl}/Proposal/rms`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        body: JSON.stringify(uid)
    });

    if(!res.ok) {
        return {
            success: false,
            message: `Não foi possível efetuar a transação`
        } as ApiResponseType;
    }

    return await res.json() as ApiResponseType;

};

export const postProposalSulAmerica = async(uid: string): Promise<ApiResponseType> => {
    
    const res = await fetch(`${baseUrl}/Proposal/sul-america`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        body: JSON.stringify(uid)
    });

    if(!res.ok) {
        return {
            success: false,
            message: `Não foi possível efetuar a transação`
        } as ApiResponseType;
    }

    return await res.json() as ApiResponseType;

};

export const postProposalUpdateSulAmerica = async(
    uid: string, token: string
): Promise<ApiResponseType> => {
    
    const res = await fetch(`${baseUrl}/Proposal/sul-america/${uid}`, {
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
