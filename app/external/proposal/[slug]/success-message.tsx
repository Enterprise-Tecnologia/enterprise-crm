import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";
import Link from "next/link";

export default function SuccessMessage({
    product,
    message,
    linkAdesao,
    linkCondicoes
}:{
    product: string,
    message: string,
    linkAdesao: string,
    linkCondicoes: string
}) {

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <h1
                className={cn(
                    `text-2xl p-4 my-3 text-teal-600 font-bold shadow-lg rounded-xl`,
                    `bg-gradient-to-b from-yellow-50 to-red-50`,
                    `w-2/3`,
                    `text-center`
                )}
            >
                {product}
            </h1>
            <h2
                className="text-xl text-teal-900 font-semibold"
            >
                Parabéns!
            </h2>
            <p className="text-center text-teal-900 p-8 italic">
                {message}
            </p>
            <ul className="text-xs">
                
                <li>
                    <Link
                        href={linkCondicoes}
                        className={cn(
                            'text-teal-900',
                            "flex flex-row space-x-2",
                            'hover:underline'
                        )}
                        target="_blank"
                    >
                        <FileText size={14} className="bg-teal-900" />
                        Baixar condições gerais
                    </Link>
                </li>
                
                <li>
                    <Link
                        href={linkAdesao}
                        className={cn(
                            'text-teal-900',
                            "flex flex-row space-x-2",
                            'hover:underline'
                        )}
                        target="_blank"
                    >
                        <FileText size={14} className="bg-teal-900" />
                        Baixar termo de adesão
                    </Link>
                </li>
            </ul>
        </div>
    );
};
