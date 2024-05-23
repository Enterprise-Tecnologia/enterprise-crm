import { getCotacoes } from "@/services/proposal";
import { ReadonlyURLSearchParams } from 'next/navigation'
import { TableDataLead } from "./_table-data-lead";

export const revalidate = 0 // revalidate always

export default async function Page({
    searchParams
}: {
    searchParams: ReadonlyURLSearchParams
})  {
    const params = new URLSearchParams();
    const pageLimit = 10;
    // let page = 1;
    let startingPage = (searchParams as any)['page'] ?? 1;

    // if ((searchParams as any)['page']) {
	// 	params.set('page', (searchParams as any)['page']);
    //     startingPage = (searchParams as any)['page'] ?? 1;
    // }

    const {totalCount, items} = await getCotacoes(startingPage, pageLimit);
    const totalPages = Math.ceil(totalCount / pageLimit);

    return (
        <>
            <div
                className={
                    `container border-2 p-4`
                }
            >
                <div className="flex justify-around bg-teal-50 my-4 p-4 rounded-lg shadow-md">
                    <h2 className="text-2xl font-extrabold m-2">
                        Propostas
                    </h2>
                </div>

                {items && items.length > 0 &&(
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
                            currentPage={startingPage}
                            pageCount={totalPages}
                        />
                    </>
                )}
            </div>

        </>
    );
};
