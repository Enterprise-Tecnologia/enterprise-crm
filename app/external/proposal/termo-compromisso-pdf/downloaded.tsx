'use client';

import { downloadItem } from "@/lib/utils";
import { postCreatePDFDocument } from "@/services/proposal-client-side";
import { useEffect, useState } from "react";

export default function DownloadedPage({term}:{term:string}) {

    const [message, setMessage] = useState('');

    const handleDownload = async (uid:string) => {
        const {data: data, success, message} = await postCreatePDFDocument(uid);

        if(!success)
            return(
                <div>
                    <h3>Nenhum parametro localizado</h3>
                    {/* <IframeButton /> */}
                </div>
        )
        setMessage(message);
        downloadItem(data, `termo-adesao_${uid}.pdf`);
    };

    useEffect(() => {
		handleDownload(term);
	}, []);

    return (
        <>
            <h2
                className="text-xl text-teal-900 font-semibold"
            >
                Parabéns!
            </h2>
            <p className="text-center text-teal-900 p-8 italic">
                {/* {message} */}
                Termo de adesão gerado com sucesso
            </p>
        </>
    );
};

