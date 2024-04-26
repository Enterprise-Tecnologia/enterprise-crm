import { FormFieldInput } from "@/components/form/form-field-input";
import { FormItemSelect } from "@/components/form/form-item-select";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
    normalizeCpfNumber,
    normalizeDate,
    normalizePhoneNumber
} from "@/lib/masks";
import { DirectSalePersonalDataInput } from "@/types/direct-sale";
import {
    SubmitHandler,
    UseFormReturn
} from "react-hook-form";

export default function FormPersonal({
    formPersonal,
    genders,
    maritialStatus,
    fnSubmit
}:{
    formPersonal: UseFormReturn<DirectSalePersonalDataInput>
    genders: {code: string; description: string;}[],
    maritialStatus: {code: string; description: string;}[],
    fnSubmit: SubmitHandler<DirectSalePersonalDataInput>
}) {

    return (
        <>
            {/* <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(formPersonal.formState.errors, null, 2)}</code>
            </pre>
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(formPersonal.getValues(), null, 2)}</code>
            </pre> */}

            {/* <div className={`w-full flex justify-center`}> */}
                <Form {...formPersonal}>
                    <form
                        onSubmit={
                            formPersonal.handleSubmit(fnSubmit)
                        }
                        method="post"
                        className={`flex flex-col justify-center w-full space-y-4`}
                    >

                        <div className="flex justify-between space-x-4">
                            <div className="w-full">
                                <FormFieldInput
                                    formControl={formPersonal.control}
                                    name={`document`}
                                    label={`CPF`}
                                    placeholder={`999.999.999-99`}
                                    fnMask={normalizeCpfNumber}
                                />
                            </div>

                            <div className="w-full">
                                <FormFieldInput
                                    formControl={formPersonal.control}
                                    name={`birthdate`}
                                    label={`Data de nascimento`}
                                    placeholder={`dd/mm/aaaa`}
                                    maxLength={10}
                                    fnMask={normalizeDate}
                                />
                            </div>

                        </div>

                        <div className="flex justify-between space-x-4">

                            <div className="w-full">
                                <FormFieldInput
                                    formControl={formPersonal.control}
                                    name={`name`}
                                    label={`Nome Completo`}
                                    placeholder={`Nome completo`}
                                    maxLength={100}
                                />
                            </div>

                            <div className="w-full">
                                <FormItemSelect
                                    formControl={formPersonal.control}
                                    name={`gender`}
                                    label={`Sexo`}
                                    placeholder={`Escolha o sexo`}
                                    // description="Escolha o estado"
                                    list={genders}
                                />
                            </div>

                        </div>

                        <div className="flex justify-between space-x-4">

                            <div className="w-full">
                                <FormItemSelect
                                    formControl={formPersonal.control}
                                    name={`maritialState`}
                                    label={`Estado civil`}
                                    placeholder={`Escolha o estado civil`}
                                    // description="Escolha o estado"
                                    list={maritialStatus}
                                />
                            </div>

                            <div className="w-full">
                                <FormFieldInput
                                    formControl={formPersonal.control}
                                    name={`cellphone`}
                                    label={`Telefone Móvel`}
                                    placeholder={`Telefone móvel`}
                                    fnMask={normalizePhoneNumber}
                                />
                            </div>
                            
                        </div>

                        <div className="w-full">
                            <FormFieldInput
                                formControl={formPersonal.control}
                                name={`email`}
                                label={`Email`}
                                placeholder={`Email`}
                                maxLength={100}
                            />
                        </div>
                        

                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                className={`w-2/3`}
                            >
                                Próximo
                            </Button>
                        </div>
                    </form>
                </Form>
            {/* </div> */}
        </>
    )
};