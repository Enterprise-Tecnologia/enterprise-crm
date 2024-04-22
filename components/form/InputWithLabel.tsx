import { Input } from "@/components/ui/input";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Control } from "react-hook-form";

export function InputWithLabel(
    {
        name,
        label,
        placeholder,
        formControl,
        description
    }
    : {
        name:string,
        label:string,
        placeholder:string,
        formControl: Control<any>,
        description?: string
    }) {

    return (
        <FormField
            control={formControl}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                        />
                    </FormControl>
                    {description && (
                        <FormDescription>
                            {description}
                        </FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
