'use client';

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import {
    DirectSaleInput,
    DirectSaleSchema
} from "@/types/direct-sale";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Product } from "@/types/product";

import { FormFieldInput } from "@/components/form/form-field-input";
import { FormItemSelect } from "@/components/form/form-item-select";
import { normalizeCpfNumber, normalizeDate } from "@/lib/masks";

export default function FormVendaDireta({
    product,
    states,
    genders
}:{
    product: Product,
    states: {code: number; description: string;}[],
    genders: {code: number; description: string;}[],
}) {

    const form = useForm<DirectSaleInput>({
        resolver: zodResolver(DirectSaleSchema),
        mode: 'onChange',
        defaultValues: {
            product: product.uid
        }
    });

    const testData = {
        name: 'Charles barbosa',
        email: 'teste',
        birthDate: '24/04/2020'
    };

    // const good = DirectSaleSchema.parse(testData);


    function onSubmit(data: DirectSaleInput) {
        // toast({
        //   title: "You submitted the following values:",
        //   description: (
        //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //     </pre>
        //   ),
        // })
    }

    return (
        <>
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(form.formState.errors, null, 2)}</code>
        </pre>
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(form.getValues(), null, 2)}</code>
        </pre>
        <div className={`w-full flex justify-center`}>
            <Form {...form}>
                <form
                    onSubmit={
                        form.handleSubmit(onSubmit)
                    }
                    className={`flex flex-col justify-center w-2/3 space-y-6`}
                >

                    <FormFieldInput
                        formControl={form.control}
                        name={`document`}
                        label={`CPF`}
                        placeholder={`999.999.999-99`}
                        maxLength={14}
                        fnMask={normalizeCpfNumber}
                    />

                    <FormFieldInput
                        formControl={form.control}
                        name={`name`}
                        label={`Nome Completo`}
                        placeholder={`nome completo`}
                        maxLength={100}
                    />

                    <FormFieldInput
                        formControl={form.control}
                        name={`birthdate`}
                        label={`Data de nascimento`}
                        placeholder={`dd/mm/aaaa`}
                        maxLength={10}
                        fnMask={normalizeDate}
                    />

                    <FormFieldInput
                        formControl={form.control}
                        name={`email`}
                        label={`Email`}
                        placeholder={`email`}
                        maxLength={100}
                    />

                    <FormItemSelect
                        formControl={form.control}
                        name={`state`}
                        label={`Estado`}
                        placeholder={`Escolha o estado`}
                        // description="Escolha o estado"
                        list={states}
                    />

                    <FormItemSelect
                        formControl={form.control}
                        name={`gender`}
                        label={`Sexo`}
                        placeholder={`Escolha o sexo`}
                        // description="Escolha o estado"
                        list={genders}
                    />

                    <Button type="submit">Enviar</Button>
                </form>
            </Form>
        </div>
        </>
    );
}
