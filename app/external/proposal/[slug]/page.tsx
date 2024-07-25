import FormVendaDireta from "./form-venda-direta";
import { getProductBySlug } from "@/services/product";
import { getDomainByGroup } from "@/services/domain";
import { Product } from "@/types/product";
import { Domain } from "@/types/domain";
// import IframeButton from "./iframe-button";
import { Suspense } from "react";

export default async function Page(
    {params: {slug}}: {params: {slug: string}}
) {
    const {data: data, success} = await getProductBySlug(slug);

    if(!slug || !success)
        return(
            <div>
                <h3>Nenhum parametro localizado</h3>
                {/* <IframeButton /> */}
            </div>
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
            code: `${gender.id}`,
            abv: gender.code
        };
    });

    const maritialsList = maritials.success
        && maritials.data.map((maritial:Domain) => {
        return {
            description: maritial.description,
            code: `${maritial.id}`,
            abv: maritial.code
        };
    });

    return (
        <>
            <Suspense fallback={<div>Carregando...</div>}>
                <FormVendaDireta
                    product={data as Product}
                    states={statesList}
                    genders={gendersList}
                    maritialStatus={maritialsList}
                />
            </Suspense>
        </>
    );
}
