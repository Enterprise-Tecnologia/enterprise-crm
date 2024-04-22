'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/form/InputWithLabel";
import { SelectWithLabel } from "@/components/form/SelectWithLabel";

type externalProposal = {
    product: string;
    document: string;
    name: string;
    email: string;
    birthdate: Date;
    gender: number;
    maritialState: number;
    zipcode: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    cellphone: string;
    monthlyAmount?: number;
    weight?: number;
    height?: number;
    profession?: number;
    bank?: string;
    bankBranch?: string;
    bankAccount?: string;
    bankAccountDigit?: string;
};

const ExternalProposalFormSchema = z.object({
    product: z.string({
        required_error: `Produto é obrigatório`
    }),
    document: z.string({
        required_error: `CPF é obrigatório`
    })
    .min(11, { message: 'CPf com tamanho inválido' })
    .transform(cpf => {
        return cpf;
    }),
    name: z.string({
        required_error: `Nome é obrigatório`
    }),
    birthdate: z.coerce.date({
        required_error: `Data de nascimento é obrigatório`
    }),
    gender: z.coerce.number({
        required_error: `Sexo é obrigatório`
    }),
    maritialState: z.coerce.number({
        required_error: `Estado civil é obrigatório`
    }),
    email: z.string({
        required_error: `Email é obrigatório`,
    }).email({
        message: `O email é inválido`
    }),
    zipcode: z.string({
        required_error: `Estado é obrigatório`
    }),
    street: z.string({
        required_error: `Endereço é obrigatório`
    }),
    number: z.string({
        required_error: `Número do endereço é obrigatório`
    }),
    neighborhood: z.string({
        required_error: `Bairro é obrigatório`
    }),
    city: z.string({
        required_error: `Cidade é obrigatório`
    }),
    state: z.coerce.number({
        required_error: `Estado é obrigatório`
    }),
    cellphone: z.string({
        required_error: `Telefone é obrigatório`
    }),
    monthlyAmount: z.coerce.number().optional(),
    weight: z.coerce.number().optional(),
    height: z.coerce.number().optional(),
    profession: z.coerce.number().optional(),
    bank: z.string().optional(),
    bankBranch: z.string().optional(),
    bankAccount: z.string().optional(),
    bankAccountDigit: z.string().max(1).optional()
    // avatar: z.instanceof(FileList)
});

export default function FormVendaDireta() {

    const form = useForm<z.infer<typeof ExternalProposalFormSchema>>({
        resolver: zodResolver(ExternalProposalFormSchema),
        defaultValues: {
            product: '123-456-789'
        }
    });

    function onSubmit(data: z.infer<typeof ExternalProposalFormSchema>) {
        // toast({
        //   title: "You submitted the following values:",
        //   description: (
        //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //     </pre>
        //   ),
        // })
    }

    const estados = []

    return (
        <div className={`w-full flex justify-center`}>
            <Form {...form}>
                <form
                    onSubmit={
                        form.handleSubmit(onSubmit)
                    }
                    className={`flex flex-col justify-center w-2/3 space-y-6`}
                >
                    <SelectWithLabel
                        formControl={form.control}
                        name={`email`}
                        label={`Nome Completo`}
                        placeholder={`Escolha o estado`}
                        description="You can manage email addresses in your"
                    />

                    <InputWithLabel
                        formControl={form.control}
                        name={`name`}
                        label={`Nome Completo`}
                        placeholder={`Nome Completo`}
                    />

                    <Button type="submit">Enviar</Button>
                </form>
            </Form>
        </div>
    );
}
