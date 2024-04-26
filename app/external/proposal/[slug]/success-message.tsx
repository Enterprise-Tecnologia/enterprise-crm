import { cn } from "@/lib/utils";

export default function SuccessMessage({
    product,
    message
}:{
    product: string,
    message: string
}) {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <h1
                className={cn(
                    `text-2xl p-4 my-3 text-zinc-600 font-bold shadow-lg rounded-xl`,
                    `bg-gradient-to-b from-yellow-50 to-red-50`,
                    `w-2/3`,
                    `text-center`
                )}
            >
                {product}
            </h1>
            <p className="text-center p-4 italic">
                {message}
            </p>
        </div>
    );
};