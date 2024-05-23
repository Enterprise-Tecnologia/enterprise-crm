import { Button } from "@/components/ui/button";
import { ICotacao } from "./_columns";
import { cpfCnpjFormatter } from "@/lib/cpf-cnpj-formatter";
import ProcessingMessage from "@/app/external/proposal/[slug]/processing-message";
import { useState } from "react";
import { FieldValue } from "./[uid]/_field-value";
import { ArrowRightCircleIcon } from "lucide-react";
import { postProposalRms, postProposalSulAmerica, postProposalUpdateSulAmerica } from "@/services/proposal-client-side";
import { useRouter } from "next/navigation";

export const DialogLeadContent = ({data}: {data:ICotacao}) => {

    const router = useRouter();
    const [sending, setSending] = useState(false);
    const [message, setMessage] = useState('');

    if(message) {
        return(
            <div>
                {message}
            </div>
        );
    }

    if(sending) {
        return <ProcessingMessage />;
    }

    const handleSendRMS = () => {
        setSending(true);

        postProposalRms(data.uid).then(res => {
            setMessage(res.message);

            if(res.success) {
                router.refresh();
            }

        }).finally(() => {
            setSending(false);
        });
    };

    const handleSendSulAmerica = () => {
        setSending(true);

        postProposalSulAmerica(data.uid).then(res => {
            setMessage(res.message);

            if(res.success) {
                router.refresh();
            }

        }).finally(() => {
            setSending(false);
        });
    };

    const handleReSendSulAmerica = () => {

        setSending(true);

        postProposalUpdateSulAmerica(data.uid, data.proposal[0]?.externalId!).then(res => {
            setMessage(res.message);

            if(res.success) {
                router.refresh();
            }

        }).finally(() => {
            setSending(false);
        });
    };

    return (
        <>
            <div className="grid grid-cols-2">

                <FieldValue label="CPF" value={cpfCnpjFormatter(data?.document)} />
                <FieldValue label="Nome" value={data.name} />
                <FieldValue label="Produto" value={data.product.name.toUpperCase()} />
                <FieldValue label="Data proposta" value={data.created} />
            </div>

            {data.proposal.length === 0 && (
                <div className="flex justify-center pt-4">
                    {data.product.company.name === 'RMS' && (
                        <Button
                            onClick={handleSendRMS}
                            className="gap-2"
                        >
                            Enviar cotação
                            <ArrowRightCircleIcon size={24} className="text-green-300" />
                        </Button>
                    )}

                    {data.product.company.name === 'Sul América' && (
                        <Button
                            onClick={handleSendSulAmerica}
                            className="gap-2"
                        >
                            Enviar cotação
                            <ArrowRightCircleIcon size={24} className="text-blue-300" />
                        </Button>
                    )}

                </div>
            )}

            {data.proposal.length === 1 && (
                <>
                <div className="grid grid-cols-2">
                    <FieldValue label={`Data envio`} value={data.proposal[0].created} />
                    {data.proposal[0]?.externalId && (
                        <FieldValue label={`Chave externa`} value={data.proposal[0].externalId} />
                    )}
                </div>

                <div className="flex justify-center pt-4">
                    {data.product.company.name === 'Sul América' && (
                        <Button
                            onClick={handleReSendSulAmerica}
                            className="gap-2"
                        >
                            Reenviar cotação
                            <ArrowRightCircleIcon size={24} className="text-blue-300" />
                        </Button>
                    )}

                </div>
                </>
            )}
            

        </>
    )

};
