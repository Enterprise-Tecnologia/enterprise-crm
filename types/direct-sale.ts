import { TypeOf, z } from "zod";

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

export const DirectSaleSchema = z.object({
    product: z.string({
        required_error: `Produto é obrigatório`
    }),
    document: z.string({
        required_error: `CPF é obrigatório`
    })
    .min(14, { message: 'CPf com tamanho inválido' })
    .transform(cpf => {
        return cpf.replace(/\D/g, '');
    }),
    name: z.string({
        required_error: `Nome é obrigatório`
    }),
    birthdate: z.coerce.date({
        required_error: `Data de nascimento é obrigatório`,
        invalid_type_error: `Data inválida 1`
    })
    .transform((data) => new Date( data ))
    .refine((data) => data > new Date(), { message: 'Data inválida 2' }),
    gender: z.coerce.number({
        required_error: `Sexo é obrigatório`
    }),
    maritialState: z.coerce.number({
        required_error: `Estado civil é obrigatório`
    }),
    email: z.string({
        required_error: `Email é obrigatório`,
    }).email({
        message: `O email é inválido`
    }),
    zipcode: z.string({
        required_error: `Estado é obrigatório`
    }),
    street: z.string({
        required_error: `Endereço é obrigatório`
    }),
    number: z.string({
        required_error: `Número do endereço é obrigatório`
    }),
    neighborhood: z.string({
        required_error: `Bairro é obrigatório`
    }),
    city: z.string({
        required_error: `Cidade é obrigatório`
    }),
    state: z.coerce.number({
        required_error: `Estado é obrigatório`
    }),
    cellphone: z.string({
        required_error: `Telefone é obrigatório`
    }),
    monthlyAmount: z.coerce.number().optional(),
    weight: z.coerce.number().optional(),
    height: z.coerce.number().optional(),
    profession: z.coerce.number().optional(),
    bank: z.string().optional(),
    bankBranch: z.string().optional(),
    bankAccount: z.string().optional(),
    bankAccountDigit: z.string().max(1).optional()
    // avatar: z.instanceof(FileList)
});

export type DirectSaleInput = TypeOf<typeof DirectSaleSchema>;
