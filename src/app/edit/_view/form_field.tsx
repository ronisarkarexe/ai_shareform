"use client";
import { Input } from "@/components/ui/input";
import { IForm, IFormFields } from "@/model/form.model";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import FieldEdit from "./field_edit";

const FormFieldView = (props: {
  formValue: IForm;
  onFieldSaveUpdate: (value: any, index: number) => void;
  onFieldDelete: (index: number) => void;
  selectedTheme: string;
  isEdit: boolean;
  onSaveForm: (value: any) => void;
}) => {
  const [formData, setFormData] = useState<null>(null);

  const handelResponseForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handelSelectChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handelCheckBoxChange = () => {};

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    props.onSaveForm(formData);
  };

  const getViewForm = (field: IFormFields) => {
    switch (field.fieldType) {
      case "text":
      case "tel":
        return (
          <div>
            <Input
              type={field.fieldType}
              placeholder={field.placeholder}
              name={field.fieldName}
              onChange={(e) => handelResponseForm(e)}
              required={field.required}
            />
          </div>
        );
      case "email":
        return (
          <div>
            <Input
              type={field.fieldType}
              placeholder={field.placeholder}
              name={field.fieldName}
              onChange={(e) => handelResponseForm(e)}
              required={field.required}
            />
          </div>
        );
      case "date":
        return (
          <div>
            <Input
              type={field.fieldType}
              placeholder={field.placeholder}
              name={field.fieldName}
              onChange={(e) => handelResponseForm(e)}
              required={field.required}
            />
          </div>
        );
      case "textarea":
        return (
          <div>
            <Textarea
              placeholder={field.placeholder}
              name={field.fieldName}
              onChange={(e) => handelResponseForm(e)}
            />
          </div>
        );
      case "checkbox":
        return (
          <div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={field.fieldName}
                required={field.required}
                // onCheckedChange={(e) =>
                //   handelCheckBoxChange(field.fieldName, e)
                // }
              />
              <label
                htmlFor={field.fieldName}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {field?.label}
              </label>
            </div>
          </div>
        );
      case "select":
        return (
          <div>
            {/* <Select
              onValueChange={(v) => handelSelectChange(field.fieldName, v)}
            >
              <SelectTrigger className="w-full bg-transparent">
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field?.options?.map((fieldValue, index) => (
                  <SelectItem key={index} value={fieldValue}>
                    {fieldValue}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className="border p-3 rounded-md shadow-sm"
      data-theme={props.selectedTheme}
    >
      <h1 className="font-bold text-center text-2xl text-primary">
        {props.formValue.formTitle}
      </h1>
      <h2 className="text-sm text-gray-500 text-center">
        {props.formValue.formHeading}
      </h2>
      {props?.formValue?.fields?.length > 0 ? (
        props.formValue?.fields?.map((field, index) => (
          <div key={index}>
            <div className="my-1">
              <div className="flex items-center justify-between ">
                <label className="text-sm text-primary">
                  {field.fieldTitle}
                </label>
                {props.isEdit && (
                  <FieldEdit
                    defaultValue={field}
                    onSaveUpdate={(value) =>
                      props.onFieldSaveUpdate(value, index)
                    }
                    onDelete={() => props.onFieldDelete(index)}
                  />
                )}
              </div>
              {getViewForm(field)}
            </div>
          </div>
        ))
      ) : (
        <div></div>
      )}
      <button type="submit" className="btn btn-outline btn-primary btn-sm mt-2">
        Save
      </button>
    </form>
  );
};

export default FormFieldView;
