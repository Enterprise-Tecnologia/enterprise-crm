import { cn } from "@/lib/utils";
import { postCancellationRmsVerificationToken } from "@/services/proposal";

export const revalidate = 0;

export default async function Page(
    {params: {token}}: {params: {token: string}}
) {

    const {data: data, success} = await postCancellationRmsVerificationToken(token);

    if(!token || !success)
        return(
            <div>O recurso que você está procurando não está disponível</div>
    )

    return(
        <div className="flex flex-col items-center w-screen h-screen pt-20">

            {/* {pdfDocument && (<embed src={`data:application/pdf;base64,${pdfDocument}`} />)} */}
            
            <h1
                className={cn(
                    `text-2xl p-4 my-3 text-teal-600 font-bold shadow-lg rounded-xl`,
                    `bg-gradient-to-b from-yellow-50 to-red-50`,
                    `w-2/3`,
                    `text-center`
                )}
            >
                {data.product.name}
            </h1>
            <h2
                className="text-xl text-teal-900 font-semibold"
            >
                Cancelado com sucesso
            </h2>
            <p className="text-center text-teal-900 p-8 italic">
                Sua solicitação de cancelamento foi efetuada com sucesso.
            </p>

        </div>
    )
};

