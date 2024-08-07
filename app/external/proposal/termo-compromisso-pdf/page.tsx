import { Suspense } from "react";
import DownloadedPage from "./downloaded";

export default async function Page(
    {searchParams: {term}}: {searchParams: {term: string}}
) {

    return (
        <Suspense fallback={`Carregando...`}>
            <DownloadedPage term={term} />
        </Suspense>
    );
}
