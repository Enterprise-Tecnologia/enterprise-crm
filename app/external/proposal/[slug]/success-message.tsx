'use client';

import { cn, downloadItem } from "@/lib/utils";
import { postCreatePDFDocument } from "@/services/proposal-client-side";
import { FileText } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import Loading from "./loading";

export default function SuccessMessage({
    product,
    message,
    linkCondicoes,
    leadUid
}:{
    product: string,
    message: string,
    linkCondicoes: string,
    leadUid: string
}) {

    const redirectIndividual = process.env.NEXT_PUBLIC_REDIRECT_RMS_INDIVIDUAL ?? '';
    const redirectFamiliar = process.env.NEXT_PUBLIC_REDIRECT_RMS_FAMILIAR ?? '';

    const _handleTermoAdesao = async(): Promise<void> => {

        if(!leadUid)    return;

        const pdfResult = postCreatePDFDocument(leadUid)
            .then(result => {
                if(!result.success) return;

                downloadItem(result.data, `termo-adesao_${leadUid}.pdf`);
            });
    };

    const handleRedirect = async() => {

        const redirectUrl = product
            .indexOf('Individual') > 0
                ? `${redirectIndividual}?t=${leadUid}`
                : `${redirectFamiliar}?t=${leadUid}`;

        parent.location = redirectUrl;
    };

    useEffect(() => {
        setTimeout(() => {handleRedirect();}, 500);
    }, []);

    return (<Loading />);

    return (
        <div className="flex flex-col items-center w-screen h-screen pt-20">

            {/* {pdfDocument && (<embed src={`data:application/pdf;base64,${pdfDocument}`} />)} */}
            
            <h1
                className={cn(
                    `text-2xl p-4 my-3 text-teal-600 font-bold shadow-lg rounded-xl`,
                    `bg-gradient-to-b from-yellow-50 to-red-50`,
                    `w-2/3`,
                    `text-center`
                )}
            >
                {product}
            </h1>
            <h2
                className="text-xl text-teal-900 font-semibold"
            >
                Parabéns!
            </h2>
            <p className="text-center text-teal-900 p-8 italic">
                {message}
            </p>
            <ul className="text-sm space-y-1">
                
                <li>
                    <Link
                        href={linkCondicoes}
                        className={cn(
                            'text-teal-900',
                            "flex flex-row space-x-2",
                            'hover:underline'
                        )}
                        target="_blank"
                    >
                        <FileText size={18} />
                        Baixar condições gerais
                    </Link>
                </li>

                {leadUid && (
                    <li>
                        <Link
                            href={`#`}
                            className={cn(
                                'text-teal-900',
                                "flex flex-row space-x-2",
                                'hover:underline'
                            )}
                            // target="_blank"
                            onClick={_handleTermoAdesao}
                        >
                            <FileText size={18} />
                            Baixar termo de adesão
                        </Link>
                    </li>
                )}

            </ul>
        </div>
    );
};
