import { TypeOf, z } from "zod";
import { isCpfValid } from "../lib/cpf-validate";
import { isValidDataPtBr } from "@/lib/date-validate";
import {
    isCreditCardExpirationValid,
    isCreditCardNumberValid,
    isCreditCardSecurityValid
} from "@/lib/credit-card-validate";

export type DirectSale = {
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

// export const DirectSaleSchema = z.object({
//     product: z.string({
//         required_error: `Produto é obrigatório`
//     }),
//     document: z.string({
//             required_error: `CPF é obrigatório`
//         })
//         .min(14, { message: 'CPf com tamanho inválido' })
//         // .transform(cpf => cpf.replace(/\D/g, '')}),
//         .refine(cpf => isCpfValid(cpf),
//             {message: 'Cpf informado é inválido'}),
//     name: z.string({
//             required_error: `Nome é obrigatório`
//         })
//         .min(10, {
//             message: `Nome precisa ser informado corretamente`}
//         ),
//     birthdate: z.string({
//             required_error: `Data de nascimento é obrigatório`
//         })
//         .min(10, {
//             message: `Data de nascimento deve ser informado corretamente`}
//         )
//         // .transform((data) => new Date( data ))
//         .refine((data) => isValidDataPtBr(data),
//             {message: `Data de nascimento inválida 2`}),
//     email: z.string({
//             required_error: `Email é obrigatório`,
//         }).email({
//             message: `O email é inválido`
//         }),
//     gender: z.coerce.number({
//         required_error: `Sexo é obrigatório`
//     }),
//     maritialState: z.coerce.number({
//         required_error: `Estado civil é obrigatório`
//     }),
//     zipcode: z.string({
//         required_error: `Estado é obrigatório`
//     }),
//     street: z.string({
//         required_error: `Endereço é obrigatório`
//     }),
//     number: z.string({
//         required_error: `Número do endereço é obrigatório`
//     }),
//     neighborhood: z.string({
//         required_error: `Bairro é obrigatório`
//     }),
//     city: z.string({
//         required_error: `Cidade é obrigatório`
//     }),
//     state: z.coerce.number({
//         required_error: `Estado é obrigatório`
//     }),
//     cellphone: z.string({
//         required_error: `Telefone é obrigatório`
//     }),
//     monthlyAmount: z.coerce.number().optional(),
//     weight: z.coerce.number().optional(),
//     height: z.coerce.number().optional(),
//     profession: z.coerce.number().optional(),
//     bank: z.string().optional(),
//     bankBranch: z.string().optional(),
//     bankAccount: z.string().optional(),
//     bankAccountDigit: z.string().max(1).optional()
//     // avatar: z.instanceof(FileList)
// });

export const DirectSaleAddressSchema = z.object({
    zipcode: z.string({
            required_error: `Estado é obrigatório`
        })
        .min(9, {message: `CEP com preenchimento inválido`})
        .refine(cep => true, {message: `CEP inválido`}), // CEP validate
    street: z.string({
        required_error: `Endereço é obrigatório`
    }),
    number: z.string().optional(),
    neighborhood: z.string({
        required_error: `Bairro é obrigatório`
    }),
    city: z.string({
        required_error: `Cidade é obrigatório`
    }),
    state: z.string({
        required_error: `Estado é obrigatório`
    })
});

export const DirectSalePaymentSchema = z.object({
    type: z.string({
        required_error: `Tipo de pagamento é obrigatório`
    }),
    bank: z.string()
        .min(2, {message: `O Banco deve serpreenchido corretamente`})
        .optional(),
    bankBranch: z.string()
        .min(2, {message: `Agência deve ser preenchido corretamente`})
        .optional(),
    bankAccount: z.string()
        .min(2, {message: `Conta deve ser preenchido corretamente`})
        .optional(),
    bankAccountDigit: z.string()
        .max(1, {message: `Dígito da conta deve ser preenchido corretamente`})
        .optional(),
    document: z.string({
            required_error: `CPF do titular é obrigatório`
        })
        .min(14, { message: 'CPf com tamanho inválido' })
        // .transform(cpf => cpf.replace(/\D/g, '')}),
        .refine(cpf => isCpfValid(cpf), {
            message: 'Cpf informado é inválido'
        }),
    cardNumber: z.string({
            required_error: `Número do cartão é obrigatório`
        }).min(19, {message: `Número do cartão de crédito com preenchimento incorreto`})
        .refine(cardNumber => isCreditCardNumberValid(cardNumber), {
            message: `Número do cartão é inválido`
        }),
    cardExpires: z.string({
            required_error: `Data de expiração é obrigatório`
        }).min(5, {message: `Data de expiração inválida com preenchimento incorreto`})
        .refine(cardExpires => isCreditCardExpirationValid(cardExpires), {
            message: `Data de expiração do cartão é inválido`
        }),
    cardSecurity: z.string({
            required_error: `Código de segurança é obrigatório`
        }).min(3, {message: `Código de segurança com preenchimento incorreto`})
        .refine(cardSecurity => isCreditCardSecurityValid(cardSecurity), {
            message: `Código de segurança do cartão é inválido`
        }),
    accept: z.boolean({
        required_error: `É necessário aceitar o termo`
    })
    //.refine(acpt => console.log(acpt))
});

export const DirectSaleProductSchema = z.object({
    product: z.string({
        required_error: `Produto é obrigatório`
    }),
    name: z.string().optional(),
    monthlyAmount: z.coerce.number().optional()
});

export const DirectSalePersonalDataSchema = z.object({
    document: z.string({
            required_error: `CPF é obrigatório`
        })
        .min(14, { message: 'CPf com tamanho inválido' })
        // .transform(cpf => cpf.replace(/\D/g, '')}),
        .refine(cpf => isCpfValid(cpf),
            {message: 'Cpf informado é inválido'}),
    name: z.string({
            required_error: `Nome é obrigatório`
        })
        .min(10, {
            message: `Nome precisa ser informado corretamente`}
        ),
    birthdate: z.string({
            required_error: `Data de nascimento é obrigatório`
        })
        .min(10, {
            message: `Data de nascimento deve ser informado corretamente`}
        )
        // .transform((data) => new Date( data ))
        .refine((data) => isValidDataPtBr(data),
            {message: `Data de nascimento inválida`}),
    email: z.string({
            required_error: `Email é obrigatório`,
        }).email({
            message: `O email é inválido`
        }),
    gender: z.string({
        required_error: `Sexo é obrigatório`,
        invalid_type_error: `Sexo é obrigatório`
    }),
    maritialState: z.string({
        required_error: `Estado civil é obrigatório`,
        invalid_type_error: `Estado civil é obrigatório`
    }),
    cellphone: z.string({
        required_error: `Telefone é obrigatório`
    }),
    weight: z.coerce.number().optional(),
    height: z.coerce.number().optional(),
    profession: z.coerce.number().optional(),
    // avatar: z.instanceof(FileList)
});

export const DirectSaleSchema = z.object({
    productData: DirectSaleProductSchema,
    personalData: DirectSalePersonalDataSchema,
    paymentData: DirectSalePaymentSchema.optional(),
    addressesData: z.array(DirectSaleAddressSchema).min(1)
});

export type DirectSaleProductDataInput = TypeOf<typeof DirectSaleProductSchema>;
export type DirectSalePersonalDataInput = TypeOf<typeof DirectSalePersonalDataSchema>;
export type DirectSaleAddressDataInput = TypeOf<typeof DirectSaleAddressSchema>;
export type DirectSalePaymentDataInput = TypeOf<typeof DirectSalePaymentSchema>;
export type DirectSaleInput = TypeOf<typeof DirectSaleSchema>;
