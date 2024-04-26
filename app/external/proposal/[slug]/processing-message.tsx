import { LoadingSpinner } from "@/app/external/proposal/[slug]/loading-spinner";

export default function ProcessingMessage() {
    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="text-xl">Aguarde...</div>
            <LoadingSpinner />
            <span className="italic">
                Estamos consultando as informações solicitadas no servidor
            </span>
        </div>
    );
};
