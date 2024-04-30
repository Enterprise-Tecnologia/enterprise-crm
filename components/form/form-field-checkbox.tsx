import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../ui/form";
import { Control } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";

export function FormFieldCheckbox({
    name,
    label,
    description,
    formControl
}: {
    name: string,
    label: string,
    description?: string,
    formControl: Control<any>
}) {

    

    return (

            <FormField
                control={formControl}
                name={name}
                render={({ field }) => (
                    <>
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:ring-1 ring-teal-100">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel className="text-teal-800 hover:cursor-pointer hover:underline">
                                    {label}
                                </FormLabel>
                                {description && (
                                    <FormDescription>
                                        {description}
                                    </FormDescription>
                                )}
                                <FormMessage />
                            </div>
                            
                        </FormItem>
                    </>
                )}
        />
    );
};
