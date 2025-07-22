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
  | "dropdown";

export interface FormElement {
  id: string;
  type: FormElementType;
  label: string;
  placeholder?: string;
  [key: string]: any;
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
  setFormElements: React.Dispatch<React.SetStateAction<FormElement[]>>;
}

export interface PropertiesPanelProps {
  selectedElement: FormElement | null;
  onUpdateElement: (updated: FormElement) => void;
}
