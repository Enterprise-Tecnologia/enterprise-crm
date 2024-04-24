import { Input } from "@/components/ui/input";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Control } from "react-hook-form";
import { InputHTMLAttributes } from "react";

interface FormFieldInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name:string,
    label:string,
    formControl: Control<any>,
    description?: string,
    fnMask?: Function
};

export function FormFieldInput(
    {
        name,
        label,
        formControl,
        description,
        fnMask,
        ...rest
    }
    : FormFieldInputProps
) {

    return (
        <FormField
            control={formControl}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            {...field}
                            {...rest}
                            onChange={(event) => fnMask
                                && field.onChange(fnMask(event.target.value))}
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
