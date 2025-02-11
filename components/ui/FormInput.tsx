import { FieldValues, Path, UseFormReturn } from "react-hook-form";

// components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HTMLInputTypeAttribute } from "react";
import { cn } from "@/lib/utils";

type FormItemType<TSchema extends FieldValues> = {
  name: Path<TSchema>;
  form: UseFormReturn<TSchema>;
  label?: string;
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  labelClassName?: string;
  ishidden?: boolean;
};

export const FormInput = <TSchema extends FieldValues>({
  form,
  name,
  label,
  type = "text",
  placeholder,
  labelClassName,
  ishidden = false,
}: FormItemType<TSchema>) => {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className="">
          {label && <FormLabel className={labelClassName}>{label}</FormLabel>}
          <FormControl>
            <Input
              className={cn(ishidden && "hidden")}
              disabled={ishidden}
              type={type}
              placeholder={placeholder}
              {...field}
              value={
                typeof field.value === "boolean"
                  ? String(field.value)
                  : field.value
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
