import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { FormElement, FormElementType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createDefaultElement(type: FormElementType): FormElement {
  const id = `field_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 9)}`;
  const base = {
    id,
    type,
    label: `New ${type}`,
  };

  switch (type) {
    case "textInput":
      return { ...base, type: "textInput" } as FormElement;
    case "emailInput":
      return { ...base, type: "emailInput" } as FormElement;
    case "numberInput":
      return { ...base, type: "numberInput" } as FormElement;
    case "textarea":
      return { ...base, type: "textarea", rows: 4 } as FormElement;
    case "checkbox":
      return {
        ...base,
        type: "checkbox",
        options: [
          { id: "opt1", label: "Option 1", value: "option1" },
          { id: "opt2", label: "Option 2", value: "option2" },
        ],
      } as FormElement;
    case "radioGroup":
      return {
        ...base,
        type: "radioGroup",
        options: [
          { id: "opt1", label: "Option A", value: "A" },
          { id: "opt2", label: "Option B", value: "B" },
        ],
      } as FormElement;
    case "dropdown":
      return {
        ...base,
        type: "dropdown",
        options: [
          { id: "opt1", label: "Item 1", value: "item1" },
          { id: "opt2", label: "Item 2", value: "item2" },
        ],
      } as FormElement;
    case "rating":
      return {
        ...base,
        type: "rating",
        maxRating: 5,
        ratingType: "star",
      } as FormElement;
    case "linearScale":
      return {
        ...base,
        type: "linearScale",
        minValue: 1,
        maxValue: 5,
        minLabel: "Low",
        maxLabel: "High",
      } as FormElement;
    case "date":
      return { ...base, type: "date" } as FormElement;
    default:
      throw new Error(`Unknown form element type: ${type}`);
  }
}
