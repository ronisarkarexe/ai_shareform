export interface FormData {
  id: string;
  jsonForm: string;
  createdAt: string;
  updatedAt: string;
}
export interface IFormFields {
  fieldLabel: string;
  fieldName: string;
  fieldType: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  checkboxLabel: string;
}

export interface IForm {
  formSubheading: string;
  formTitle: string;
  formFields: IFormFields[];
}
