"use client";
import { IFormResponse } from "@/model/form.model";
import React, { useEffect, useState } from "react";
import ViewFormList from "./_view/view_form_list";
import { toast } from "sonner";

const FormList = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<IFormResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/forms`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        if (result.statusCode) {
          setFormData(result.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // console.log(formData);

  const onDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/forms/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDeleted: true }),
      });
      if (response.ok) {
        toast("Form delete successfully!");
        const data = formData.filter((formId) => formId.id !== id);
        setFormData(data);
      } else {
        console.error("Form submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {formData.map((form, index) => (
        <ViewFormList
          key={index}
          form={form.jsonForm}
          id={form.id}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default FormList;
