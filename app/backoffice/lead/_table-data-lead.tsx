'use client';

import React, { useEffect } from "react";
import DataTable from "../table/data-table";
import Paginator from "../table/paginator";

import {
    ICotacao,
    leadColumns
} from "./_columns";

import {
    useRouter,
    useSearchParams
} from 'next/navigation';

export const TableDataLead = ({
	data,
	currentPage,
	pageCount
}: {
	data: ICotacao[]
	currentPage: number
	pageCount: number
}) => {

    const router = useRouter();
	const searchParams = useSearchParams();

    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {
		setIsLoading(false)
	}, [searchParams])

    return (
        <>
        {data &&(
            <>
                <DataTable
                    data={data}
                    columns={leadColumns}
                    isLoading={isLoading}
                />
                <Paginator
                    currentPage={currentPage}
                    totalPages={pageCount}
                    onPageChange={p => {
                        // setCurrentPage(p)
                        setIsLoading(true)
                        const params = searchParams?.toString();

                        const newSearchParams = new URLSearchParams(params);
                        newSearchParams.set('page', p.toString());
                        router.push(`/backoffice/lead?${newSearchParams.toString()}`);
                    }}
                    showPreviousNext
                    disabled={isLoading}
                />
            </>
        )}
        </>
    );

};
