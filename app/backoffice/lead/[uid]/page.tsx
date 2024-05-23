import { getCotacao } from "@/services/proposal";
import { FieldValue } from "./_field-value";
import { Badge } from "@/components/ui/badge";
import { FieldTitle } from "./_field-title";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircleIcon } from "lucide-react";
import Link from "next/link";

export default async function Page({
    params: { uid }}: {params: { uid: string }
})  {

    const { data, success } = await getCotacao(uid);

    if(!success) {
        return (
            <div>
                Não foi possível localizar o recurso especificado.
            </div>
        );
    }

    return (
        <>
            
            <div className="container border-2 p-4">

                <div>
                    <Link
                        href={`/backoffice/lead`}
                    >
                        <Button
                            type="button"
                            className={`gap-2`}
                        >
                            <ArrowLeftCircleIcon size={24}/>
                            Voltar
                        </Button>
                    </Link>
                </div>

                <FieldTitle label="Cotação" />

                <div className="grid grid-cols-2 bg-zinc-100 rounded-lg p-2">
                    <FieldValue label={`Data`} value={data.created} />
                    <FieldValue label={`Situação`} value={<Badge>{data.status}</Badge>} />
                    <FieldValue label={`Tipo Pagamento`} value={data.paymentIntentNavigation?.type} />
                </div>

                <FieldTitle label="Produto" />

                <div className="grid grid-cols-2 bg-zinc-100 rounded-lg p-2">
                    <FieldValue label={`Produto`} value={data.product.name} />
                    <FieldValue label={`Parceiro`} value={data.product.company.name} />
                </div>

                <FieldTitle label="Dados Pessoais" />

                <div className="grid grid-cols-2 bg-zinc-100 rounded-lg p-2">
                    <FieldValue label={`CPF`} value={data.document} />
                    <FieldValue label={`Nome`} value={data.name} />
                    <FieldValue label={`Nascimento`} value={data.birthdate} />
                    <FieldValue label={`Email`} value={data.email} />
                    <FieldValue label={`Telefone`} value={data.cellPhone} />
                    <FieldValue label={`Sexo`} value={data.gender?.description} />
                    <FieldValue label={`Estado Civil`} value={data.maritialState?.description} />
                </div>

                <FieldTitle label="Endereço" />

                <div className="grid grid-cols-2 bg-zinc-100 rounded-lg p-2">
                    <FieldValue label={`CEP`} value={data.addressZipcode} />
                    <FieldValue label={`Logradouro`} value={data.addressStreet} />
                    <FieldValue label={`Número`} value={data.addressNumber} />
                    <FieldValue label={`Bairro`} value={data.addressNeighborhood} />
                    <FieldValue label={`Cidade`} value={data.addressCity} />
                    <FieldValue label={`Estado`} value={data.addressState?.description} />
                </div>

            </div>

        </>
    );
};
