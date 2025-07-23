import type { FormCanvasProps, SortableFormElementProps } from "@/lib/types";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FormElementPreview } from "./SortableFormElement";
import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useFormElements } from "@/store/formElements";

function SortableFormElement({
  element,
  onSelect,
  onDelete,
  isSelected,
}: SortableFormElementProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: element.id, data: { type: "canvasElement", element } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      onClick={() => onSelect(element.id)}
      className={`bg-white shadow p-4 mb-2 rounded border ${
        isSelected ? "border-blue-500" : "border-gray-200"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="text-gray-500 text-sm drag-handle" {...listeners}>
          ☰
        </div>
        <button
          onClick={() => onDelete(element.id)}
          className="text-red-500 text-sm hover:underline"
        >
          Delete
        </button>
      </div>
      {/* <input type="text" name="test" id="" placeholder="enter your text here" /> */}
      <FormElementPreview element={element} />
    </div>
  );
}

export function FormCanvas({ formElements }: FormCanvasProps) {
  const deleteFormElement = useFormElements(
    (state) => state.deleteFormElements
  );
  const { setNodeRef: setDroppableRef } = useDroppable({ id: "form-canvas" });
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null
  );

  const handleSelectElement = (id: string) => setSelectedElementId(id);
  const handleDeleteElement = (id: string) => {
    // setFormElements((prev: FormElement[]) => prev.filter((el) => el.id !== id));
    deleteFormElement(id);
    if (selectedElementId === id) setSelectedElementId(null);
  };

  return (
    <div
      ref={setDroppableRef}
      className="w-2/4 p-4 bg-gray-100 min-h-screen overflow-y-auto relative z-0"
    >
      <h3 className="text-lg font-semibold mb-2">Your Form</h3>
      <SortableContext
        items={formElements.map((el) => el.id)}
        strategy={verticalListSortingStrategy}
      >
        {formElements.length === 0 && (
          <p className="text-gray-400">Drag and drop elements here.</p>
        )}
        {formElements.map((element) => (
          <SortableFormElement
            key={element.id}
            element={element}
            onSelect={handleSelectElement}
            onDelete={handleDeleteElement}
            isSelected={selectedElementId === element.id}
          />
        ))}
      </SortableContext>
    </div>
  );
}
