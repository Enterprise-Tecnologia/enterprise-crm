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
import { ChevronLeftCircleIcon, CircleCheckBigIcon } from "lucide-react";
import {
    SubmitHandler,
    UseFormReturn
} from "react-hook-form";
import Summary from "./summary";
import { Product } from "@/types/product";

export default function FormPayment({
    product,
    formPayment,
    fnSubmit,
    fnNavigation
}:{
    product: Product,
    formPayment: UseFormReturn<DirectSalePaymentDataInput>,
    fnSubmit: SubmitHandler<DirectSalePaymentDataInput>
    fnNavigation: Function
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

                        <div className="flex flex-row justify-between">
                            <div className="w-full">
                                <div className="flex justify-between space-x-4">
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

                                <div className="flex justify-between space-x-4">
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
                            <div className="min-w[450px] p-6">
                                <Summary
                                    product={product}
                                    description={undefined}
                                    payment={formPayment}
                                />
                            </div>
                        </div>

                        <FormFieldCheckbox
                            formControl={formPayment.control}
                            name={`accept`}
                            label={`Termo de adesão`}
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
                                className={`w-2/3`}
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
