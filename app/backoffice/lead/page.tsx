import { getCotacoes } from "@/services/proposal";
import DataTable from "../table/data-table";
import { leadColumns } from "./_columns";
import Paginator from "../table/paginator";
import { ReadonlyURLSearchParams } from 'next/navigation'
import { TableDataLead } from "./_table-data-lead";

export const revalidate = 0 // revalidate always

export default async function Page({
    searchParams
}: {
    searchParams: ReadonlyURLSearchParams
})  {
    const params = new URLSearchParams()
    const pageLimit = 10;
    let page = 1;

    const {totalCount, items } = await getCotacoes(page, pageLimit);
    const totalPages = Math.ceil(totalCount / pageLimit);

    if ((searchParams as any)['page'])
		params.set('page', (searchParams as any)['page'])


    return (
        <>
            <div
                className={
                    `container border-2 p-4`
                }
            >
                Cotações

                {items &&(
                    <>
                        {/* <DataTable
                            data={items}
                            columns={leadColumns}
                        />
                        <Paginator
                            currentPage={page}
                            totalPages={totalPages}
                            showPreviousNext={true}
                            onPageChange={(event) => console.log(event)}
                        /> */}
                        <TableDataLead
                            data={items}
                            currentPage={page}
                            pageCount={totalCount}
                        />
                    </>
                )}
            </div>

        </>
    );
};
