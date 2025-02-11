"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/FormInput";

import { createAndUpdateBook } from "@/actions/queriesActions";
import { handleError } from "@/lib/handleError";
import {
  AddNewBookSchema,
  AddNewBookSchemaType,
} from "@/schemas/addNewBookSchema";
import Image from "next/image";
import { useEffect, useState } from "react";
import ImgUploader from "./ImgUploader";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddNewBookForm = () => {
  const [url, setUrl] = useState<string>("");
  const [trackProgress, setTrackProgress] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<AddNewBookSchemaType>({
    resolver: zodResolver(AddNewBookSchema),
    defaultValues: {
      title: "",
      author: "",
      country: "",
      imageLink: "",
      language: "",
      pages: "",
      year: "",
    },
  });

  async function onSubmit(values: AddNewBookSchemaType) {
    console.log(values);
    try {
      const res = await createAndUpdateBook(values);

      if (!res.success) {
        throw new Error(res.message);
      }

      toast.success(res.message);
      router.push("/library");
    } catch (err) {
      const res = handleError(err);
      toast.error(res.error);
      console.log(res.error);
    }
  }

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
      setUrl("");
      setTrackProgress(0);
    }
    form.setValue("imageLink", url);
  }, [form, form.formState.isSubmitSuccessful, url]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          form={form}
          name="title"
          placeholder="Enter Book Title"
          label="Title"
        />
        <FormInput
          form={form}
          name="author"
          placeholder="Enter Book's Author Name"
          label="Author"
        />

        <div className="flex gap-4">
          <FormInput
            form={form}
            name="country"
            placeholder="Enter Country Name"
            label="Country"
          />

          <FormInput
            form={form}
            name="language"
            placeholder="Enter Avaiable Language by comma"
            label="Language"
          />
        </div>

        <div className="flex gap-4">
          <FormInput
            form={form}
            name="pages"
            placeholder="Enter Total Pages"
            label="Pages"
          />
          <FormInput
            form={form}
            name="year"
            placeholder="Enter Book Published Year"
            label="Published Year"
          />
        </div>
        <FormInput
          form={form}
          name="imageLink"
          placeholder="Upload Your Book Image"
          label="Upload Your Book Image"
          ishidden
        />

        {url ? (
          <Image
            src={url}
            width={100}
            height={100}
            alt={form.getValues("title")}
          />
        ) : (
          <ImgUploader
            setUrl={setUrl}
            setTrackProgress={setTrackProgress}
            trackProgress={trackProgress}
            setLoading={setLoading}
            loading={loading}
          />
        )}

        <Button disabled={form.formState.isSubmitting || loading} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddNewBookForm;
