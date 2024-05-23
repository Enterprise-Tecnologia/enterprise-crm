import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";
import { ICotacao } from "./_columns";
import { DialogLead } from './_dialog-lead';
import { useState } from 'react';
import DialogAlert from '@/components/ui/dialog-alert';
import { DialogLeadContent } from './_dialog-lead-content';

export default function DropDownMenuLead({
    cotacao
}:{
    cotacao: ICotacao
}) {

    const router = useRouter();
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogData, setDialogData] = useState<{
		title: string
		body: string | JSX.Element
	}>({ title: 'Erro', body: 'Ocorreu um erro.' });

    const handleSendProposal = (cotacao:ICotacao) => {

        setDialogData({
            title: `Envio de proposta (${cotacao.product.company?.name ?? ''})`,
            body: <DialogLeadContent data={cotacao} />,
        });
        setOpenDialog(opt => !opt);
    };

    return (
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Opções</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(cotacao.uid)}
            >
                Copiar Id
            </DropdownMenuItem>
            
            {/* {cotacao.proposal.length === 0 &&( */}
            {cotacao.status === 'Pending' || cotacao.status === 'Error' &&(
                <DropdownMenuItem
                    onClick={() => handleSendProposal(cotacao)}
                >
                    Enviar Proposta
                </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>View customer</DropdownMenuItem> */}
            <DropdownMenuItem
                onClick={() => router.push(`lead/${cotacao.uid}`)}
            >
                ver detalhes
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <DialogAlert
            open={openDialog}
            title={dialogData.title}
            onOpenChange={setOpenDialog}
        >
            {dialogData.body}
        </DialogAlert>
        </>
    )

};
