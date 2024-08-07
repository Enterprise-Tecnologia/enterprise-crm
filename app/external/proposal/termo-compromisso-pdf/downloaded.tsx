'use client';

import {
    useEffect,
    useState
} from "react";

import { downloadItem } from "@/lib/utils";
import { postCreatePDFDocument } from "@/services/proposal-client-side";

export default function DownloadedPage({
    term
}:{
    term:string
}) {
    const [message, setMessage] = useState('');
    const [base64, setBase64] = useState<undefined | string>();

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
        setBase64(data);
        // downloadItem(data, `termo-adesao_${uid}.pdf`);
    };

    useEffect(() => {
		handleDownload(term);
	}, []);

    return (
        <>
            <div
                className={`w-screen h-screen`}
            >
                <h2
                    className="text-xl text-teal-900 font-semibold text-center p-6"
                >
                    Termo de adesão
                </h2>
                {base64 && (
                    <embed
                        src={`data:application/pdf;base64,${base64}`}
                        className={`w-full h-5/6`}
                    />
                )}
            </div>
        </>
    );
};

