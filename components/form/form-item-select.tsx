import { Control } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function FormItemSelect(
    {
        name,
        label,
        placeholder,
        formControl,
        description,
        list
    }
    : {
        name:string,
        label:string,
        placeholder:string,
        formControl: Control<any>,
        description?: string,
        list?: {
            code: string;
            description: string
        }[]
    }) {

    return (
        <FormField
            control={formControl}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        {list && (
                            <SelectContent>
                                {list && list.map(item => {
                                    return (
                                        <SelectItem
                                            key={item.code}
                                            value={item.code}
                                        >
                                            {item.description}
                                        </SelectItem>
                                    )
                                })}
                            </SelectContent>
                        )}
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
