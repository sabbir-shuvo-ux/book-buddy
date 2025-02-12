import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type CheckboxOption = {
  id: string | number;
  label: string | null;
};

type CheckboxGroupProps<TSchema extends FieldValues> = {
  name: Path<TSchema>;
  form: UseFormReturn<TSchema>;
  options: CheckboxOption[];
  title: string;
};

const CheckboxGroup = <TSchema extends FieldValues>({
  name,
  options,
  form,
  title,
}: CheckboxGroupProps<TSchema>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <div className="mb-4 mt-4">
            <FormLabel className="text-base">{title}</FormLabel>
          </div>
          {options.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={
                        item.label
                          ? field.value?.includes(item.label) ?? false
                          : false
                      }
                      onCheckedChange={(checked) => {
                        if (!item.label) return;

                        field.onChange(
                          checked
                            ? [...(field.value ?? []), item.label]
                            : (field.value ?? []).filter(
                                (value) => value !== item.label
                              )
                        );
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    {item.label}
                  </FormLabel>
                </FormItem>
              )}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CheckboxGroup;
