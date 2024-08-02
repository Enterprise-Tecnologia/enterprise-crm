import { Badge } from "@/components/ui/badge";
import { DirectSalePaymentDataInput } from "@/types/direct-sale";
import { Product } from "@/types/product";
import { Separator } from "@radix-ui/react-select";
import { CreditCardIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

export default function Summary({
    product,
    payment,
    description
}:{
    product:Product,
    payment: UseFormReturn<DirectSalePaymentDataInput>,
    description?:string
}) {

    const currencyOptions = {
        style: 'currency',
        currency: 'BRL'
    } as Intl.NumberFormatOptions;

    return (
        <div className={
                "bg-gradient-to-b from-yellow-50 to-zinc-50 rounded-md p-2 flex flex-col shadow-md hover:ring-1 ring-teal-100"
            }
        >
            <div className="flex flex-col w-full">
                <h2 className="text-center text-xl font-bold text-zinc-500">
                    {product.name}
                </h2>
                {description && (
                    <span className="text-center text-xs text-zinc-500">
                        {description}
                    </span>
                )}
            </div>
            <Separator />
            <div className="w-full">
                <div className="flex justify-between space-x-2">
                    <div>
                        <span className="text-xs truncate text-zinc-500">
                            {product.name}
                        </span>
                    </div>
                    <div>
                        <span className="text-xs italic text-zinc-500">
                            {new Intl.NumberFormat('pt-BR', currencyOptions).format(product.price)}
                        </span>
                    </div>
                </div>
            </div>
            {/* {payment?.formState.isValid && (
                <> */}
                    <Separator />
                    <div className="w-full">
                        <h3 className="font-semibold p-3">
                            Pagamento
                        </h3>
                        <div className="flex justify-between space-x-2">
                            {!payment.control.getFieldState('cardNumber').invalid &&
                            (<div className={`w-full flex`}>
                                    <div className="m-3">
                                        <CreditCardIcon size={18}/>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs truncate text-zinc-500">
                                            {`**** **** ****`}{payment.getValues('cardNumber')?.substring(14)}
                                        </span>
                                        <span className="text-xs truncate text-zinc-500">
                                            CPF: {payment.getValues('document')}
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div className={`w-full`}>
                                <div className="flex flex-col text-right">
                                    <span className="text-xs truncate text-zinc-500">
                                        Cartão de crédito
                                    </span>
                                    <div>
                                        <Badge
                                            variant={`default`}
                                            className="font-light text-xs"
                                        >
                                            Recorrente
                                        </Badge>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                {/* </>
            )} */}
        </div>
    );
};
