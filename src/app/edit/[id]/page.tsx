"use client";
import { FormData, IForm } from "@/model/form.model";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormFieldView from "../_view/form_field";

const EditForm = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [data, setData] = useState<FormData | null>(null);
  const [formData, setFormData] = useState<IForm[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/forms/0204bce7-a35e-45d7-a543-73c45533e2bb`
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
          setFormData(JSON.parse(jsonString) as IForm[]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
          <FormFieldView formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default EditForm;
