import type { FormElement } from "@/lib/types";

export function FormElementPreview({ element }: { element: FormElement }) {
  switch (element.type) {
    case "textInput":
      return (
        <input
          type="text"
          placeholder={element.placeholder}
          disabled
          className="w-full mt-2 p-2 border rounded"
        />
      );
    case "emailInput":
      return (
        <input
          type="email"
          placeholder={element.placeholder}
          disabled
          className="w-full mt-2 p-2 border rounded"
        />
      );
    case "numberInput":
      return (
        <input
          type="number"
          placeholder={element.placeholder}
          disabled
          className="w-full mt-2 p-2 border rounded"
        />
      );
    case "textarea":
      return (
        <textarea
          placeholder={element.placeholder}
          disabled
          className="w-full mt-2 p-2 border rounded"
        />
      );
    case "checkbox":
      return <input type="checkbox" disabled className="mt-2" />;
    case "radioGroup":
      return (
        <div className="mt-2">
          <input type="radio" disabled /> Option
        </div>
      );
    case "dropdown":
      return (
        <select disabled className="w-full mt-2 p-2 border rounded">
          <option>Option 1</option>
        </select>
      );
    default:
      return null;
  }
}
