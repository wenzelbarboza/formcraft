import type { PaletteItemProps } from "@/lib/types";
import { useDraggable } from "@dnd-kit/core";

function DraggablePaletteItem({ type, label }: PaletteItemProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: type,
    data: { type: "paletteItem", label },
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <>
      <div
        ref={setNodeRef}
        style={{ ...style, zIndex: 50 }}
        {...listeners}
        {...attributes}
        className="p-2 m-1 bg-blue-100 border border-blue-300 rounded cursor-grab hover:bg-blue-200"
      >
        {label}
      </div>
    </>
  );
}

export function ComponentsPalette() {
  const elementTypes: PaletteItemProps[] = [
    { type: "textInput", label: "Text Input" },
    { type: "emailInput", label: "Email Input" },
    { type: "numberInput", label: "Number Input" },
    { type: "textarea", label: "Textarea" },
    { type: "checkbox", label: "Checkbox" },
    { type: "radioGroup", label: "Radio Group" },
    { type: "dropdown", label: "Dropdown" },
  ];

  return (
    <div className="w-1/4 p-4 border-r border-gray-300 bg-gray-50 h-screen overflow-y-auto">
      <h3 className="text-lg font-semibold mb-2">Elements</h3>
      {elementTypes.map((type) => (
        <DraggablePaletteItem key={type.type} {...type} />
      ))}
    </div>
  );
}
