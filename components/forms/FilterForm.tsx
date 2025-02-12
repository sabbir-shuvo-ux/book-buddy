"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import CheckboxGroup from "@/components/ui/CheckboxGroup";
import { Form } from "@/components/ui/form";
import {
  FilterFormSchema,
  FilterFormSchemaType,
} from "@/schemas/FilterFormSchema";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  countries: BaseData[];
  languages: BaseData[];
};

type BaseData = {
  id: string;
  label: string | null;
};

function FilterForm({ countries, languages }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // get data from quary url or initially set data from props
  const getLanguagesParams = searchParams.get("languages")?.split(",") || [];
  const getCountriesParams = searchParams.get("countries")?.split(",") || [];

  const form = useForm<FilterFormSchemaType>({
    resolver: zodResolver(FilterFormSchema),
    defaultValues: {
      countries: getCountriesParams,
      languages: getLanguagesParams,
    },
  });

  // handle quary string
  const onSubmit = (data: FilterFormSchemaType) => {
    // add data on url so user can reload
    const params = new URLSearchParams(searchParams.toString());

    if (data.countries.length > 0) {
      params.set("countries", data.countries.join(","));
    }
    if (data.languages.length > 0) {
      params.set("languages", data.languages.join(","));
    }

    router.push(pathname + "?" + params.toString(), { scroll: false });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CheckboxGroup
          form={form}
          name="countries"
          options={countries}
          title="Filter By Countries"
        />

        <CheckboxGroup
          form={form}
          name="languages"
          options={languages}
          title="Filter By Languages"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default FilterForm;
