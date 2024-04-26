import { Input } from "@/components/ui/input";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../ui/form";
import { Control } from "react-hook-form";
import { InputHTMLAttributes } from "react";

interface FormFieldInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name:string,
    label:string,
    formControl: Control<any>,
    description?: string,
    fnMask?: Function
    fnOnChange?: Function
};

export function FormFieldInput(
    {
        name,
        label,
        formControl,
        description,
        fnMask,
        fnOnChange,
        ...rest
    }
    : FormFieldInputProps
) {

    return (
        <FormField
            control={formControl}
            name={name}
            render={({ field }) => (
                // fnMask(event.target.value))
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            {...rest}
                            {...field}
                            onChange={(event) => [
                                    fnMask
                                        ? field.onChange(fnMask(event.target.value))
                                        : field.onChange(event),
                                    fnOnChange
                                        ? fnOnChange(event.target.value)
                                        : undefined
                                ]
                            }
                            // onBlur={(event) => fnOnBlur
                            //     ? fnOnBlur(field.value)
                            //     : undefined
                            // }
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
