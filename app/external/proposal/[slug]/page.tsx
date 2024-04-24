import { Suspense } from "react";
import FormVendaDireta from "./form-venda-direta";
import { getProductBySlug } from "@/services/product";
import { getDomainByGroup } from "@/services/domain";
import { Product } from "@/types/product";

export default async function Page(
    {params: {slug}}: {params: {slug: string}}
) {

    const {data: data, success} = await getProductBySlug(slug);

    if(!slug || !success)
        return(
            <div>Nenhum parametro localizado</div>
    )

    const [states, genders] = await Promise.all([
        getDomainByGroup('state'),
        getDomainByGroup('gender')
    ]);


    const statesList = states.success
        && states.data.map((x:any) => {
        return {
            description: x.description,
            code: x.id
        };
    });

    const gendersList = genders.success
        && genders.data.map((x:any) => {
        return {
            description: x.description,
            code: x.id
        };
    });

    return (
        <>
            {/* <Suspense fallback={<div>Carregando...</div>}> */}
                <FormVendaDireta
                    product={data as Product}
                    states={statesList}
                    genders={gendersList}
                />
            {/* </Suspense> */}
        </>
    );
}
