import { FormFieldInput } from "@/components/form/form-field-input";
import { FormItemSelect } from "@/components/form/form-item-select";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { normalizeCepNumber } from "@/lib/masks";
import { DirectSaleAddressDataInput } from "@/types/direct-sale";
import { ChevronLeftCircleIcon, ChevronRightCircleIcon } from "lucide-react";
import {
    SubmitHandler,
    UseFormReturn
} from "react-hook-form";

export default function FormAddress({
    formAddress,
    states,
    fnSubmit,
    fnNavigation,
    fnOnChange
}:{
    formAddress: UseFormReturn<DirectSaleAddressDataInput>,
    states: {code: string; description: string;}[],
    fnSubmit: SubmitHandler<DirectSaleAddressDataInput>,
    fnNavigation: Function
    fnOnChange?: Function,
}) {

    return (
        <>

            {/* <div className={`w-full flex justify-center`}> */}
                <Form {...formAddress}>
                    <form
                        onSubmit={
                            formAddress.handleSubmit(fnSubmit)
                        }
                        method="post"
                        className={`flex flex-col justify-center w-full space-y-4`}
                    >

                        <div className="flex flex-col sm:flex-row justify-between sm:space-x-4">

                            <div className="w-full">
                                <FormFieldInput
                                    formControl={formAddress.control}
                                    name={`zipcode`}
                                    label={`CEP`}
                                    placeholder={`99999-999`}
                                    fnMask={normalizeCepNumber}
                                    fnOnChange={fnOnChange}
                                    maxLength={9}
                                />
                            </div>

                            <div className="w-full">
                                <FormFieldInput
                                    formControl={formAddress.control}
                                    name={`street`}
                                    label={`Endereço`}
                                    placeholder={`Endereço`}
                                    maxLength={100}
                                />
                            </div>
                            
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between sm:space-x-4">
                            
                            <div className="w-full">
                                <FormFieldInput
                                    formControl={formAddress.control}
                                    name={`number`}
                                    label={`Número`}
                                    placeholder={`Número`}
                                    maxLength={20}
                                />
                            </div>

                            <div className="w-full">
                                <FormFieldInput
                                    formControl={formAddress.control}
                                    name={`neighborhood`}
                                    label={`Bairro`}
                                    placeholder={`Bairro`}
                                    maxLength={100}
                                />
                            </div>

                        </div>

                        <div className="flex flex-col sm:flex-row justify-between sm:space-x-4">

                            <div className="w-full">
                                <FormFieldInput
                                    formControl={formAddress.control}
                                    name={`city`}
                                    label={`Cidade`}
                                    placeholder={`Cidade`}
                                    maxLength={100}
                                />
                            </div>

                            <div className="w-full">
                                <FormItemSelect
                                    formControl={formAddress.control}
                                    name={`state`}
                                    label={`Estado`}
                                    placeholder={`Escolha o estado`}
                                    // description="Escolha o estado"
                                    list={states}
                                />
                            </div>

                        </div>

                        <div className="flex justify-center space-x-4">
                            <Button
                                type="button"
                                className={`w-2/3`}
                                onClick={() => fnNavigation(1)}
                                variant={`outline`}
                                id={'btn-anterior-form-cadastro-homo'}
                            >
                                <ChevronLeftCircleIcon size={18} className="m-4" />
                                Anterior
                            </Button>

                            <Button
                                type="submit"
                                className={`w-2/3 bg-[#233FFA] hover:bg-[#236efa]`}
                                id={'btn-proximo-form-pagamento-homo'}
                            >
                                Próximo
                                <ChevronRightCircleIcon size={18} className="m-4" />
                            </Button>
                        </div>
                    </form>
                </Form>
            {/* </div> */}
        </>
    )
};
