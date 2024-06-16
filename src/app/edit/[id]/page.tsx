"use client";
import { FormData, IForm } from "@/model/form.model";
import { ArrowLeft, Eye, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormFieldView from "../_view/form_field";
import { toast } from "sonner";
import Customized from "../_customized/customized";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const EditForm = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [data, setData] = useState<FormData | null>(null);
  const [formData, setFormData] = useState<IForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState<string>("light");
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
      <div className="flex item-center justify-between">
        <h1
          className="flex gap-2 items-center mt-1 my-2 cursor-pointer hover:font-bold text-primary text-sm"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </h1>
        <div className="flex gap-2 mb-3">
          <Link href={"/aiform/" + id} target="_blank">
            <Button className="flex gap-2">
              {" "}
              <Eye className="w-5 h-5" /> Live Preview
            </Button>
          </Link>
          <Button className="flex gap-2">
            {" "}
            <Share2 className="w-5 h-5" /> Share
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="border rounded-md shadow-sm p-3 border-primary">
          <Customized selectedTheme={(value) => setSelectedTheme(value)} />
        </div>
        <div className="md:col-span-2 border border-primary rounded-md h-full p-3">
          {formData != null && (
            <FormFieldView
              formValue={formData}
              onFieldSaveUpdate={onFieldSaveUpdate}
              onFieldDelete={onFieldDelete}
              selectedTheme={selectedTheme}
              isEdit={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditForm;
