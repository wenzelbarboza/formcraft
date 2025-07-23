import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import type { FormElement, FormElementType } from "@/lib/types";
import { ComponentsPalette } from "@/components/ComponentsPallette";
import { FormCanvas } from "@/components/FormCanvas";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { useFormElements } from "@/store/formElements";
import { createDefaultElement } from "@/lib/utils";

function FormEditor() {
  // const [formElements, setFormElements] = useState<FormElement[]>([]);
  const formElements = useFormElements((state) => state.formElements);
  const addFormElement = useFormElements((state) => state.addFormElement);
  const swapFormElement = useFormElements((state) => state.swapFormElements);

  const [selectedElement, setSelectedElement] = useState<FormElement | null>(
    null
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    // shifting from element list to canvas
    if (
      active.data.current?.type === "paletteItem" &&
      over.id === "form-canvas"
    ) {
      const newElement = createDefaultElement(active.id as FormElementType);

      // setFormElements((prev: FormElement[]) => [...prev, newElement]);
      addFormElement(newElement);
    } else if (
      // sorting within list
      active.id !== over.id &&
      formElements.some((el) => el.id === active.id) &&
      formElements.some((el) => el.id === over.id)
    ) {
      const oldIndex = formElements.findIndex((el) => el.id === active.id);
      const newIndex = formElements.findIndex((el) => el.id === over.id);
      swapFormElement(oldIndex, newIndex);

      // setFormElements((items: FormElement[]) =>
      //   arrayMove(items, oldIndex, newIndex)
      // );
    }
  };

  const handleUpdateElement = (updated: FormElement) => {
    // setFormElements((prev: FormElement[]) =>
    //   prev.map((el) => (el.id === updated.id ? updated : el))
    // );
    setSelectedElement(updated);
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="flex">
        <ComponentsPalette />
        <FormCanvas
          formElements={formElements}
          // setFormElements={setFormElements}
        />
        <PropertiesPanel
          selectedElement={selectedElement}
          onUpdateElement={handleUpdateElement}
        />
      </div>
    </DndContext>
  );
}

export default FormEditor;
