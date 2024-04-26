import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel
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
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>
                                {label}
                            </FormLabel>
                            {description && (
                                <FormDescription>
                                    {description}
                                </FormDescription>
                            )}
                        </div>
                    </FormItem>
                )}
        />
    );
};
