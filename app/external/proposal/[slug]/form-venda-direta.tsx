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
import { postAddLead } from "@/services/proposal-client-side";
import CenteredSpinner from "./_components/centered-spinner";
import SuccessMessage from "./success-message";
import { cn } from "@/lib/utils";
import { getAddressByCEP } from "@/services/viacep-client-side";
import { getPersonData } from "@/services/rockdata-client-side";

export default function FormVendaDireta({
    product,
    states,
    genders,
    maritialStatus
}:{
    product: Product,
    states: {code: string; description: string; abv: string;}[],
    genders: {code: string; description: string; abv: string;}[],
    maritialStatus: {code: string; description: string; abv: string;}[]
}) {

    const [step, setStep] = useState(1);
    const [isPending, setIsPending] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [isAlreadySubmited, setIsAlreadySubmited] = useState(false);
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
        formPersonal.trigger().then(result => {

            if(!result) return;

            if(formPersonal.formState.isValid) setStep(2);
            formPayment.setValue(
                'document', data.document, { shouldTouch: true }
            );
        });
    };

    const OnSubmitAddressStep = (data: DirectSaleAddressDataInput) => {
        formAddress.trigger().then(result => {
            if(!result) return;

            if(formAddress.formState.isValid) setStep(3);
        });
    };

    const OnSubmitPaymentStep = (data: DirectSalePaymentDataInput) => {

        formPayment.trigger().then(result => {
            if(!result || !formPayment.formState.isValid) return;
        });
        
        formSubmit.setValue(`personalData`, formPersonal.getValues());
        formSubmit.setValue(`addressesData`, [formAddress.getValues()]);
        formSubmit.setValue(`paymentData`, formPayment.getValues());
        formSubmit.setValue(`productData`, formProduct.getValues());

        formSubmit.trigger().then(result => {
            if(!result) return;
        });

        const validacaoEsquema = DirectSaleSchema.safeParse(formSubmit.getValues());

        if(!validacaoEsquema.success) return;

        setIsPending(isPending => !isPending);

        postAddLead(validacaoEsquema.data)
            .then(result => {

                if(!result.success) {
                    setDialogData({
                        title: 'Ocorreu um erro no processamento da contratação',
                        body: result.message,
                    });
                    setOpenDialog(true);
                    setIsPending(isPending => !isPending);
                    return;
                }

                setDialogData({
                    title: 'Contratação efetuada com sucesso',
                    body: result.message,
                });

                setOpenDialog(true);
                formPersonal.reset();
                formAddress.reset();
                formPayment.reset();
                formSubmit.reset();
                setStep(1);
                setIsAlreadySubmited(option => !option);
            })
            .catch(err => {
                setDialogData({
                    title: 'Ocorreu um erro no processamento da contratação',
                    body: 'A contratação não foi realizado. Tente novamente.',
                });
                setOpenDialog(true);
            })
            .finally(() => setIsPending(isPending => !isPending));
    };

    const handleNavigation = (page: number) => {
        setStep(page);
    };

    const onChangeCEP = (cep: string | undefined):void => {

        if (!cep) return;

		cep = cep.replace(/\D/g, '');

		if (cep.length < 8) {
            return;
        }

        getAddressByCEP(cep)
            .then(response => {
                if (response.erro) return;

                const state = states.find(
                    state => state.abv === response.uf
                )?.code;

                formAddress.setValue(
                    'street', response.logradouro, { shouldTouch: true }
                );
                formAddress.setValue(
                    'neighborhood', response.bairro, { shouldTouch: true }
                );
                formAddress.setValue(
                    'city', response.localidade, { shouldTouch: true }
                );
                formAddress.setValue(
                    'state', state ?? '13', { shouldTouch: true }
                );

                formAddress.trigger();
            })
            .catch(err => {console.error(err)});

    };

    const onChangeCPF = (cpf: string | undefined):void => {
        
        if (!cpf) return;

		cpf = cpf.replace(/\D/g, '');

		if (cpf.length < 10) {
            return;
        }

        getPersonData(cpf)
            .then(response => {

                const firstItem  = response[0];

                if(!firstItem || firstItem.STATUS === 'NÃO LOCALIZADO') return;

                const maritial = maritialStatus.find(
                    maritial => maritial.abv === firstItem.ESTADO_CIVIL
                )?.code;

                const gender = genders.find(
                    gender => gender.abv === firstItem.SEXO
                )?.code;

                const state = states.find(
                    state => state.abv === firstItem.ENDERECO_UF
                )?.code;

                const formatedDate = firstItem.DT_NASCIMENTO.substring(6,8)
                                    +'/'+ firstItem.DT_NASCIMENTO.substring(4,6)
                                    +'/'+ firstItem.DT_NASCIMENTO.substring(0,4);

                const formatedZipcode = firstItem.ENDERECO_CEP.substring(0, 5)
                                    +'-'+ firstItem.ENDERECO_CEP.substring(5);

                formPersonal.setValue(
                    'name', firstItem.NOME, { shouldTouch: true }
                );
                formPersonal.setValue(
                    'birthdate', formatedDate , { shouldTouch: true }
                );
                formPersonal.setValue(
                    'gender', gender ?? '1', { shouldTouch: true }
                );
                // formPersonal.resetField('gender', { defaultValue: '1', keepTouched: true });
                formPersonal.setValue(
                    'maritialState', maritial ?? '5', { shouldTouch: true }
                );
                formPersonal.setValue(
                    'cellphone', firstItem.TELEFONE1, { shouldTouch: true }
                );
                formPersonal.setValue(
                    'email', firstItem.EMAIL1.toLowerCase(), { shouldTouch: true }
                );
                formPersonal.trigger();
                

                formAddress.setValue(
                    'zipcode', formatedZipcode, { shouldTouch: true }
                );
                formAddress.setValue(
                    'street', firstItem.ENDERECO, { shouldTouch: true }
                );
                formAddress.setValue(
                    'neighborhood', firstItem.ENDERECO_BAIRRO, { shouldTouch: true }
                );
                formAddress.setValue(
                    'city', firstItem.ENDERECO_CIDADE, { shouldTouch: true }
                );
                formAddress.setValue(
                    'state', state ?? '13', { shouldTouch: true }
                );
                formAddress.trigger();
            })
            .catch(err => {console.error(err)});;
    };

    if(isAlreadySubmited)
        return <SuccessMessage
                    product={product.name}
                    message={`Contratação efetuada com sucesso`}
                />

    if(isPending)
        return <CenteredSpinner />

    return (
        <>
            <div className="container">

                {step === 1 && !isPending &&
                    (<>
                        <h1
                            className={cn(
                                `text-2xl p-4 my-3 text-zinc-600 font-bold shadow-lg rounded-b-xl`,
                                `bg-gradient-to-b from-yellow-50 to-zinc-50`
                            )}
                        >
                            Dados Cadastrais
                        </h1>
                        <FormPersonal
                            formPersonal={formPersonal}
                            genders={genders}
                            maritialStatus={maritialStatus}
                            fnSubmit={OnSubmitPersonalStep}
                            fnOnChange={onChangeCPF}
                        />
                    </>)
                }

                {step === 2 && !isPending &&
                    (<>
                        <h1
                            className={cn(
                                `text-2xl p-4 my-3 text-zinc-600 font-bold shadow-lg rounded-b-xl`,
                                `bg-gradient-to-b from-yellow-50 to-zinc-50`
                            )}
                        >
                            Endereço
                        </h1>
                        <FormAddress
                            formAddress={formAddress}
                            states={states}
                            fnSubmit={OnSubmitAddressStep}
                            fnOnChange={onChangeCEP}
                            fnNavigation={handleNavigation}
                        />
                    </>)
                }
                
                {step === 3 && !isPending &&
                    (<>
                        <h1
                            className={cn(
                                `text-2xl p-4 my-3 text-zinc-600 font-bold shadow-lg rounded-b-xl`,
                                `bg-gradient-to-b from-yellow-50 to-zinc-50`
                            )}
                        >
                            Dados de pagamento
                        </h1>
                        {/* <h2
                            className={`text-xl py-3 text-zinc-600 font-bold`}
                        >
                            {formProduct.getValues('name')}
                        </h2>
                        <h3>
                            {formProduct.getValues('name')}
                        </h3>
                        <p className="text-sm text-center">
                            Pagamento em cartão de crédito recorrente
                        </p> */}
                        <FormPayment
                            formPayment={formPayment}
                            product={product}
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
