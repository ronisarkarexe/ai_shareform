export interface FormData {
  id: string;
  jsonForm: string;
  createdAt: string;
  updatedAt: string;
}
export interface IFormFields {
  fieldTitle: string;
  fieldName: string;
  fieldType: string;
  placeholder?: string;
  required: boolean;
  options?: string[] | IOption[];
  label?: string;
}

export interface IForm {
  formHeading: string;
  formTitle: string;
  fields: IFormFields[];
}

export interface IFormResponse {
  id: string;
  jsonForm: IForm[];
  createdAt: string;
  updatedAt: string;
}

interface IOption {
  value: string;
  label: string;
}
