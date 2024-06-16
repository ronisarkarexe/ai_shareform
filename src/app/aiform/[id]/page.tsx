"use client";
import FormFieldView from "@/app/edit/_view/form_field";
import { IForm } from "@/model/form.model";
import { CheckCheck, Flame, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const AIFormPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [formData, setFormData] = useState<IForm | null>(null);
  const [isResponse, setIsResponse] = useState(false);
  const [loading, setLoading] = useState(true);
  let formRef = useRef();

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

  const onSaveForm = async (value: any) => {
    const data = JSON.stringify(value);
    const userData = {
      userResponse: data,
      formDataId: id,
    };
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/userResponse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.data.id) {
          setIsResponse(true);
          toast("Your response successfully submitted!");
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
    console.log("value", data);
  };

  return (
    <div className="flex items-center justify-center mt-5">
      {isResponse ? (
        <div className="md:w-[600px]">
          {formData != null && (
            <FormFieldView
              formValue={formData}
              onFieldSaveUpdate={() => console.log()}
              onFieldDelete={() => console.log()}
              selectedTheme={"light"}
              isEdit={false}
              onSaveForm={onSaveForm}
            />
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="md:w-[700px] border border-primary rounded-sm mt-10 shadow-lg py-5">
            <div className="flex items-center justify-center text-primary">
              <CheckCheck className="w-20 h-20" />
            </div>
            <h1 className="text-3xl text-center font-bold text-secondary flex gap-2 items-center justify-center">
              Your response successfully submitted!.{" "}
              <Flame className="h-6 w-6 text-primary" />
            </h1>
          </div>
        </div>
      )}
      <Link href="/">
        <div className="flex items-center text-primary bg-white px-3 py-1 rounded-lg fixed bottom-5 left-4 cursor-pointer border border-primary">
          <Image src={"/logo.svg"} width={30} height={30} alt="logo" />
          <span className="ml-2 flex items-center justify-center">
            Build Free Form With AI{" "}
            <Sparkles className="h-4 w-4 ml-1 text-secondary" />{" "}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default AIFormPage;
