import { FormFieldCheckbox } from "@/components/form/form-field-checkbox";
import { FormFieldInput } from "@/components/form/form-field-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
    normalizeCardNumber,
    normalizeCpfNumber,
    normalizeExpiresCard
} from "@/lib/masks";
import { DirectSalePaymentDataInput } from "@/types/direct-sale";
import { ChevronLeftCircleIcon, CircleCheckBigIcon, FileTextIcon } from "lucide-react";
import {
    SubmitHandler,
    UseFormReturn
} from "react-hook-form";
import Summary from "./summary";
import { Product } from "@/types/product";
import Link from "next/link";

export default function FormPayment({
    product,
    formPayment,
    fnSubmit,
    fnNavigation,
    linkAdesao,
    linkCondicoes
}:{
    product: Product,
    formPayment: UseFormReturn<DirectSalePaymentDataInput>,
    fnSubmit: SubmitHandler<DirectSalePaymentDataInput>
    fnNavigation: Function,
    linkAdesao?: string;
    linkCondicoes?: string;
}) {

    return (
        <>
            {/* <div className={`w-full flex justify-center`}> */}
                <Form {...formPayment}>
                    <form
                        onSubmit={
                            formPayment.handleSubmit(fnSubmit)
                        }
                        method="post"
                        className={`flex flex-col justify-center w-full space-y-4`}
                    >

                        <div className="flex md:flex-row flex-col justify-between">
                            <div className="w-full">
                                <div className="flex flex-col sm:flex-row justify-between sm:space-x-4">
                                    <div className="w-full">
                                        <FormFieldInput
                                            formControl={formPayment.control}
                                            name={`cardNumber`}
                                            label={`Número do cartão`}
                                            placeholder={`9999 9999 9999 9999`}
                                            fnMask={normalizeCardNumber}
                                            maxLength={19}
                                        />
                                    </div>
                                    
                                    <div className="w-full">
                                        <FormFieldInput
                                            formControl={formPayment.control}
                                            name={`document`}
                                            label={`CPF do titular`}
                                            placeholder={`999.999.999-99`}
                                            fnMask={normalizeCpfNumber}
                                            maxLength={14}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-between sm:space-x-4">
                                    <div className="w-full">
                                        <FormFieldInput
                                            formControl={formPayment.control}
                                            name={`cardExpires`}
                                            label={`Data de expiração`}
                                            placeholder={`mm/aa`}
                                            fnMask={normalizeExpiresCard}
                                            maxLength={5}
                                        />
                                    </div>
                                    
                                    <div className="w-full">
                                        <FormFieldInput
                                            formControl={formPayment.control}
                                            name={`cardSecurity`}
                                            label={`Código de segurança`}
                                            placeholder={`CVV`}
                                            maxLength={3}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="min-w-[350px] md:pl-4 md:pt-4 py-4">
                                <Summary
                                    product={product}
                                    description={undefined}
                                    payment={formPayment}
                                />
                            </div>
                        </div>

                        <div className="flex flex-row space-x-1">
                            <FileTextIcon
                                size={24}
                                color="teal"
                            />
                            <Link
                                href={linkAdesao ?? '#'}
                                target={`_blank`}
                            >
                                <span
                                    className="text-teal-600 hover:underline"
                                >
                                    Termo de Adesão
                                </span>
                            </Link>
                        </div>

                        <FormFieldCheckbox
                            formControl={formPayment.control}
                            name={`accept`}
                            label={`Li e aceito o termos constantes no termo de adesão`}
                            description={
                                `Aceitando o termo acima você está concordando...`
                            }
                        />

                        <div className="flex justify-center space-x-4">
                            <Button
                                type="button"
                                className={`w-2/3`}
                                onClick={() => fnNavigation(2)}
                                variant={`outline`}
                            >
                                <ChevronLeftCircleIcon size={18} className="m-4" />
                                Anterior
                            </Button>

                            <Button
                                type="submit"
                                className={`w-2/3 bg-[#199185] hover:bg-[#40aa9f]`}
                            >
                                Contratar
                                <CircleCheckBigIcon size={18} className="m-4" />
                            </Button>
                        </div>
                    </form>
                </Form>
            {/* </div> */}
        </>
    )
};
