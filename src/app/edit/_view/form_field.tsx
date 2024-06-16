import { Input } from "@/components/ui/input";
import { IForm, IFormFields } from "@/model/form.model";
import React from "react";
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
}) => {
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
            />
          </div>
        );
      case "textarea":
        return (
          <div>
            <Textarea placeholder={field.placeholder} name={field.fieldName} />
          </div>
        );
      case "checkbox":
        return (
          <div>
            <div className="flex items-center space-x-2">
              <Checkbox id={field.fieldName} />
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
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field?.options?.map((fieldValue, index) => (
                  <SelectItem key={index} value={fieldValue}>
                    {fieldValue}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border p-3 rounded-md shadow-sm">
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
                <FieldEdit
                  defaultValue={field}
                  onSaveUpdate={(value) =>
                    props.onFieldSaveUpdate(value, index)
                  }
                  onDelete={() => props.onFieldDelete(index)}
                />
              </div>
              {getViewForm(field)}
            </div>
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default FormFieldView;
