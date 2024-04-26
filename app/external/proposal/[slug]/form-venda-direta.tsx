'use client';

import {
    DirectSaleAddressDataInput,
    DirectSaleAddressSchema,
    DirectSaleInput,
    DirectSalePaymentDataInput,
    DirectSalePaymentSchema,
    DirectSalePersonalDataInput,
    DirectSalePersonalDataSchema,
    DirectSaleProductDataInput,
    DirectSaleProductSchema,
    DirectSaleSchema
} from "@/types/direct-sale";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Product } from "@/types/product";
import FormPersonal from "./form-personal";
import FormAddress from "./form-address";
import FormPayment from "./form-payment";
import { useState } from "react";
import DialogAlert from "@/components/ui/dialog-alert";

export default function FormVendaDireta({
    product,
    states,
    genders,
    maritialStatus
}:{
    product: Product,
    states: {code: string; description: string; abv: string}[],
    genders: {code: string; description: string;}[],
    maritialStatus: {code: string; description: string;}[]
}) {

    const [step, setStep] = useState(1);
    const [isPending, setIsPending] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogData, setDialogData] = useState<{
		title: string
		body: string | JSX.Element
	}>({ title: 'Erro', body: 'Ocorreu um erro.' });

    const formProduct = useForm<DirectSaleProductDataInput>({
        resolver: zodResolver(DirectSaleProductSchema),
        defaultValues: {
            product: product.uid,
            name: product.name,
            monthlyAmount: product.price
        }
    });

    const formPersonal = useForm<DirectSalePersonalDataInput>({
        resolver: zodResolver(DirectSalePersonalDataSchema)
    });

    const formAddress = useForm<DirectSaleAddressDataInput>({
        resolver: zodResolver(DirectSaleAddressSchema)
    });

    const formPayment = useForm<DirectSalePaymentDataInput>({
        resolver: zodResolver(DirectSalePaymentSchema),
        defaultValues: {
            type: 'Credit'
        }
    });

    const formSubmit = useForm<DirectSaleInput>({
        resolver: zodResolver(DirectSaleSchema)
    });

    // function onSubmit(data: DirectSalePersonalDataInput) {
        // toast({
        //   title: "You submitted the following values:",
        //   description: (
        //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //     </pre>
        //   ),
        // })
    // }

    const OnSubmitPersonalStep = (data: DirectSalePersonalDataInput) => {
        formPersonal.trigger();
        if(formPersonal.formState.isValid) setStep(2);
        formPayment.setValue(
            'document', data.document, { shouldTouch: true }
        );
    };

    const OnSubmitAddressStep = (data: DirectSaleAddressDataInput) => {
        formAddress.trigger();
        if(formAddress.formState.isValid) setStep(3);
    };

    const OnSubmitPaymentStep = (data: DirectSalePaymentDataInput) => {
        formPayment.trigger();
        
        if(!formPayment.formState.isValid) return;
        
        formSubmit.setValue(`personalData`, formPersonal.getValues());
        formSubmit.setValue(`addressesData`, [formAddress.getValues()]);
        formSubmit.setValue(`paymentData`, formPayment.getValues());
        formSubmit.setValue(`productData`, formProduct.getValues());
        formSubmit.trigger();

        const validacaoEsquema = DirectSaleSchema.safeParse(formSubmit.getValues());

        if(!validacaoEsquema.success) return;

        setIsPending(isPending => !isPending);

        fetch(process.env.API_BASE_URL + '/Proposal/lead', {
		    method: 'POST',
			headers: {
			    'Content-Type': 'application/json',
			},
			body: JSON.stringify(validacaoEsquema.data),
		})
	    .then(response => response.json())
		.then(response => {
		    console.log(response)

            setDialogData({
                title: 'Ocorreu um erro no envio',
                body: 'Não foi possível efetuar a contratação.',
            });

            if (response.success) {
                formPersonal.reset();
                formAddress.reset();
                formPayment.reset();
                formSubmit.reset();
                // window.scrollTo(0, 0)
                // setHasRegistered(true)
            } else {
                setDialogData({
                    title: 'Não foi possível concluir a contratação',
                    body: response.message,
                });
                setOpenDialog(true);
                setIsPending(isPending => !isPending);
            }
		})
		.catch(err => {
            setDialogData({
                title: 'Ocorreu um erro no processamento da contratação',
                body: 'A contratação não foi realizado. Tente novamente.',
            });
            setOpenDialog(true);
            setIsPending(isPending => !isPending);
		})
		.finally(() => console.log('finally'));

    };

    const handleNavigation = (page: number) => {
        setStep(page);
    };

    const onChangeCEP = (cep: String | undefined):void => {

        if (!cep) return;

		cep = cep.replace(/\D/g, '');

		if (cep.length < 8) {
            return;
        }

	    fetch(`https://viacep.com.br/ws/${cep}/json`)
		    .then(response => response.json())
			.then(data => {

				if (data.erro) return;

                const state = states.find(
                    state => state.abv === data.uf
                )?.code;

                console.log(state);

                formAddress.setValue(
                    'street', data.logradouro, { shouldTouch: true }
                );
                // formAddress.setValue(
                //     'number', '', { shouldTouch: true }
                // );
                formAddress.setValue(
                    'neighborhood', data.bairro, { shouldTouch: true }
                );
                formAddress.setValue(
                    'city', data.localidade, { shouldTouch: true }
                );
                formAddress.setValue(
                    'state', state ?? '13', { shouldTouch: true }
                );

                formAddress.trigger();
                
            })
            // .then(data => {
            //     if (data) {
            //         setValue('endereco', data, { shouldTouch: true })
            //         trigger(['endereco'], { shouldFocus: true })
            //     }
            // })
            .catch(err => {console.error(err);console.log(err);})
    };


    return (
        <>
            <div className="container">

                {step === 1 && !isPending &&
                    (<>
                        <h1
                            className={`text-2xl p-4 my-3 text-zinc-600 font-bold shadow-lg rounded-b-xl`}
                        >
                            Dados Cadastrais
                        </h1>
                        <FormPersonal
                            formPersonal={formPersonal}
                            genders={genders}
                            maritialStatus={maritialStatus}
                            fnSubmit={OnSubmitPersonalStep}
                        />
                    </>)
                }

                {step === 2 && !isPending &&
                    (<>
                        <h1
                            className={`text-2xl p-4 my-3 text-zinc-600 font-bold shadow-lg rounded-b-xl`}
                        >
                            Endereço
                        </h1>
                        <FormAddress
                            formAddress={formAddress}
                            states={states}
                            fnSubmit={OnSubmitAddressStep}
                            fnOnBlur={onChangeCEP}
                            fnNavigation={handleNavigation}
                        />
                    </>)
                }
                
                {step === 3 && !isPending &&
                    (<>
                        <h1
                            className={`text-2xl p-4 my-3 text-zinc-600 font-bold shadow-lg rounded-b-xl`}
                        >
                            Dados de pagamento
                        </h1>
                        <h2
                            className={`text-xl py-3 text-zinc-600 font-bold`}
                        >
                            {formProduct.getValues('name')}
                        </h2>
                        <h3>
                            {formProduct.getValues('name')}
                        </h3>
                        <p className="text-sm text-center">
                            Pagamento em cartão de crédito recorrente
                        </p>
                        <FormPayment
                            formPayment={formPayment}
                            fnSubmit={OnSubmitPaymentStep}
                            fnNavigation={handleNavigation}
                        />
                    </>)
                }

            </div>

            <DialogAlert
                open={openDialog}
                title={dialogData.title}
                onOpenChange={setOpenDialog}
            >
                {dialogData.body}
            </DialogAlert>
        </>
    );
}
