import FormVendaDireta from "./form-venda-direta";

export default async function Product(
    {params: {slug}}: {params: {slug: string}}
) {
    return (
        <>
            <div>ops '{slug}'</div>
            <FormVendaDireta />
        </>
        
    );
}
