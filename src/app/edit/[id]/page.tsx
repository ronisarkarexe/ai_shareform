"use client";
import { FormData, IForm } from "@/model/form.model";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormFieldView from "../_view/form_field";
import { toast } from "sonner";

const EditForm = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [data, setData] = useState<FormData | null>(null);
  const [formData, setFormData] = useState<IForm | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/forms/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        if (result.statusCode) {
          setData(result.data);
          const jsonMatch = result.data.jsonForm.match(/{[\s\S]*}/);
          if (!jsonMatch) {
            throw new Error("Invalid JSON format");
          }
          const jsonString = jsonMatch[0];
          setFormData(JSON.parse(jsonString) as IForm);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onFieldSaveUpdate = async (
    value: {
      label: string;
      placeholder: string;
    },
    index: number
  ) => {
    const updatedFormFields =
      formData &&
      formData.fields.map((field, i) =>
        i === index
          ? {
              ...field,
              fieldTitle: value.label,
              placeholder: value.placeholder,
            }
          : field
      );
    const newData = {
      ...formData,
      fields: updatedFormFields,
    };

    if (updatedFormFields != null) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/forms/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
          }
        );

        if (response.ok) {
          const data = await response.json();
          toast("Field updated successfully!");
          const jsonMatch = data.data.jsonForm.match(/{[\s\S]*}/);
          if (!jsonMatch) {
            throw new Error("Invalid JSON format");
          }
          const jsonString = jsonMatch[0];
          setFormData(JSON.parse(jsonString) as IForm);
        } else {
          console.error("Form submission failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  const onFieldDelete = async (index: number) => {
    if (formData) {
      const updatedFields = formData.fields.filter((_, i) => i !== index);
      const newData = {
        ...formData,
        fields: updatedFields,
      };
      if (updatedFields != null) {
        try {
          const response = await fetch(
            `http://localhost:8000/api/v1/forms/${id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newData),
            }
          );

          if (response.ok) {
            toast("Field delete successfully!");
            const data = await response.json();
            const jsonMatch = data.data.jsonForm.match(/{[\s\S]*}/);
            if (!jsonMatch) {
              throw new Error("Invalid JSON format");
            }
            const jsonString = jsonMatch[0];
            setFormData(JSON.parse(jsonString) as IForm);
          } else {
            console.error("Form submission failed:", response.statusText);
          }
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      }
    }
  };

  return (
    <div className="p-3">
      <h1
        className="flex gap-2 items-center mt-1 my-2 cursor-pointer text-lg hover:font-bold text-primary"
        onClick={() => router.back()}
      >
        <ArrowLeft className="" /> Back
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="border rounded-md shadow-sm p-3 border-primary">
          controller
        </div>
        <div className="md:col-span-2 border border-primary rounded-md h-full p-3">
          {formData != null && (
            <FormFieldView
              formValue={formData}
              onFieldSaveUpdate={onFieldSaveUpdate}
              onFieldDelete={onFieldDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditForm;
