// ------------------------------------
// Types
// ------------------------------------

/* eslint-disable @typescript-eslint/no-explicit-any */

export type FormElementType =
  | "textInput"
  | "emailInput"
  | "numberInput"
  | "textarea"
  | "checkbox"
  | "radioGroup"
  | "dropdown"
  | "rating"
  | "linearScale"
  | "date";

// Base interface for all form elements
export interface BaseFormElement {
  id: string;
  type: FormElementType;
  label: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
}

// Specific interfaces for elements with options
export interface RadioGroupElement extends BaseFormElement {
  type: "radioGroup";
  options: Array<{
    id: string;
    label: string;
    value: string;
  }>;
}

export interface CheckboxElement extends BaseFormElement {
  type: "checkbox";
  options: Array<{
    id: string;
    label: string;
    value: string;
  }>;
}

export interface DropdownElement extends BaseFormElement {
  type: "dropdown";
  options: Array<{
    id: string;
    label: string;
    value: string;
  }>;
}

export interface RatingElement extends BaseFormElement {
  type: "rating";
  maxRating: number;
  ratingType: "star" | "number";
}

export interface LinearScaleElement extends BaseFormElement {
  type: "linearScale";
  minValue: number;
  maxValue: number;
  minLabel?: string;
  maxLabel?: string;
}

export interface TextInputElement extends BaseFormElement {
  type: "textInput";
  minLength?: number;
  maxLength?: number;
}

export interface NumberInputElement extends BaseFormElement {
  type: "numberInput";
  min?: number;
  max?: number;
  step?: number;
}

export interface TextareaElement extends BaseFormElement {
  type: "textarea";
  rows?: number;
  minLength?: number;
  maxLength?: number;
}

export interface EmailInputElement extends BaseFormElement {
  type: "emailInput";
}

export interface DateElement extends BaseFormElement {
  type: "date";
  minDate?: string;
  maxDate?: string;
}

// Union type for all form elements
export type FormElement =
  | TextInputElement
  | EmailInputElement
  | NumberInputElement
  | TextareaElement
  | CheckboxElement
  | RadioGroupElement
  | DropdownElement
  | RatingElement
  | LinearScaleElement
  | DateElement;

// Form structure
export interface Form {
  id: string;
  title: string;
  description?: string;
  elements: FormElement[];
  settings: {
    allowMultipleSubmissions: boolean;
    requireAuth: boolean;
    collectEmail: boolean;
    showProgressBar: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // user ID
}

// Form submission types
export type FormSubmissionValue =
  | string
  | number
  | boolean
  | string[]
  | number[];

export interface FormSubmission {
  id: string;
  formId: string;
  responses: Record<string, FormSubmissionValue>;
  submittedAt: Date;
  submitterEmail?: string;
  submitterId?: string;
}

export interface PaletteItemProps {
  type: FormElementType;
  label: string;
}

export interface SortableFormElementProps {
  element: FormElement;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  isSelected: boolean;
}

export interface FormCanvasProps {
  formElements: FormElement[];
  // setFormElements: React.Dispatch<React.SetStateAction<FormElement[]>>;
}

export interface PropertiesPanelProps {
  selectedElement: FormElement | null;
  onUpdateElement: (updated: FormElement) => void;
}
