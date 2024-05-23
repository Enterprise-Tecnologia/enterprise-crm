import { Button } from "@/components/ui/button";
import { ICotacao } from "./_columns";
import { cpfCnpjFormatter } from "@/lib/cpf-cnpj-formatter";
import ProcessingMessage from "@/app/external/proposal/[slug]/processing-message";
import { useState } from "react";
import { FieldValue } from "./[uid]/_field-value";
import { ArrowRightCircleIcon } from "lucide-react";
import { postProposalRms } from "@/services/proposal-client-side";

export const DialogLeadContent = ({data}: {data:ICotacao}) => {

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
            console.log(res);
            
            setMessage(res.message);

        }).finally(() => {
            setSending(false);
        });
    };

    const handleSendSulAmerica = () => {
        window.alert(JSON.stringify(data));
        setSending(true);
    };

    return (
        <>
            <div className="grid grid-cols-2">

                <FieldValue label="CPF" value={cpfCnpjFormatter(data?.document)} />
                <FieldValue label="Nome" value={data.name} />
                <FieldValue label="Produto" value={data.product.name.toUpperCase()} />
                <FieldValue label="Data proposta" value={data.created} />
            </div>

            <div className="flex justify-center pt-2">
                {data.product.company.name === 'RMS' && (
                    <Button
                        onClick={handleSendRMS}
                        className="gap-2"
                    >
                        Enviar cotação
                        <ArrowRightCircleIcon size={24} />
                    </Button>
                )}

                {data.product.company.name === 'Sul América' && (
                    <Button
                        onClick={handleSendSulAmerica}
                        className="gap-2"
                    >
                        Enviar cotação
                        <ArrowRightCircleIcon size={24} />
                    </Button>
                )}

            </div>

        </>
    )

};
