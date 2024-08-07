import { Suspense } from "react";
import DownloadedPage from "./downloaded";

export default async function Page(
    {searchParams: {t}}: {searchParams: {t: string}}
) {

    return (
        <Suspense fallback={`Carregando...`}>
            <DownloadedPage term={t} />
        </Suspense>
    );
}
