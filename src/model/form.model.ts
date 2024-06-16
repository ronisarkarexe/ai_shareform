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
  options?: string[];
  label?: string;
}

export interface IForm {
  formHeading: string;
  formTitle: string;
  fields: IFormFields[];
}
