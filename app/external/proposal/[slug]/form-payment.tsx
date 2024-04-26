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
import {
    SubmitHandler,
    UseFormReturn
} from "react-hook-form";

export default function FormPayment({
    formPayment,
    fnSubmit,
    fnNavigation
}:{
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
                                    label={`Titular do cartão de crédito`}
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
                                    label={`Data expiração`}
                                    placeholder={`mm/aa`}
                                    fnMask={normalizeExpiresCard}
                                    maxLength={5}
                                />
                            </div>
                            
                            <div className="w-full">
                                <FormFieldInput
                                    formControl={formPayment.control}
                                    name={`cardSecurity`}
                                    label={`Código de segurança do cartão de crédito`}
                                    placeholder={`CVV`}
                                    maxLength={3}
                                />
                            </div>
                        </div>

                        {/* <div className="flex justify-between space-x-8">
                            <div className="w-full">
                                <FormFieldInput
                                    formControl={formAddress.control}
                                    name={`neighborhood`}
                                    label={`Bairro`}
                                    placeholder={`Bairro`}
                                    maxLength={100}
                                />
                            </div>

                            <div className="w-full">
                                <FormFieldInput
                                    formControl={formAddress.control}
                                    name={`city`}
                                    label={`Cidade`}
                                    placeholder={`Cidade`}
                                    maxLength={100}
                                />
                            </div>
                        </div> */}

                        <FormFieldCheckbox
                            formControl={formPayment.control}
                            name={`accept`}
                            label={`Termo de aceite`}
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
                                Anterior
                            </Button>

                            <Button
                                type="submit"
                                className={`w-2/3`}
                            >
                                Contratar
                            </Button>
                        </div>
                    </form>
                </Form>
            {/* </div> */}
        </>
    )
};
