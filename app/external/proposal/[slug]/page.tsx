import { Suspense } from "react";
import FormVendaDireta from "./form-venda-direta";
import { getProductBySlug } from "@/services/product";
import { getDomainByGroup } from "@/services/domain";
import { Product } from "@/types/product";
import { Domain } from "@/types/domain";

export default async function Page(
    {params: {slug}}: {params: {slug: string}}
) {

    const {data: data, success} = await getProductBySlug(slug);

    if(!slug || !success)
        return(
            <div>Nenhum parametro localizado</div>
    )

    const [states, genders, maritials] = await Promise.all([
        getDomainByGroup('state'),
        getDomainByGroup('gender'),
        getDomainByGroup('maritial')
    ]);

    const statesList = states.success
        && states.data.map((state:Domain) => {
        return {
            description: state.description,
            code: `${state.id}`,
            abv: state.code
        };
    });

    const gendersList = genders.success
        && genders.data.map((gender:Domain) => {
        return {
            description: gender.description,
            code: `${gender.id}`
        };
    });

    const maritialsList = maritials.success
        && maritials.data.map((maritial:Domain) => {
        return {
            description: maritial.description,
            code: `${maritial.id}`
        };
    });

    return (
        <>
            {/* <Suspense fallback={<div>Carregando...</div>}> */}
                <FormVendaDireta
                    product={data as Product}
                    states={statesList}
                    genders={gendersList}
                    maritialStatus={maritialsList}
                />
            {/* </Suspense> */}
        </>
    );
}
