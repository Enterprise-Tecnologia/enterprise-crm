import { Control } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function SelectWithLabel(
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="m@example.com">m@example.com</SelectItem>
                            <SelectItem value="m@google.com">m@google.com</SelectItem>
                            <SelectItem value="m@support.com">m@support.com</SelectItem>
                        </SelectContent>
                    </Select>
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
