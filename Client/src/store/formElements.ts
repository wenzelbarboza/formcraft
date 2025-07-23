import type { FormElement } from "@/lib/types";
import { arrayMove } from "@dnd-kit/sortable";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type FormElementsStore = {
  formElements: FormElement[];
  addFormElement: (ele: FormElement) => void;
  deleteFormElements: (id: string) => void;
  swapFormElements: (idx1: number, idx2: number) => void;
};

export const useFormElements = create<FormElementsStore>()(
  devtools((set) => ({
    formElements: [],
    addFormElement: (ele) =>
      set(
        (state) => ({ formElements: [...state.formElements, ele] }),
        undefined,
        "FormElements/addElement"
      ),
    deleteFormElements: (id) =>
      set(
        (state) => ({
          formElements: state.formElements.filter((ele) => ele.id !== id),
        }),
        undefined,
        "FormElements/deleteElement"
      ),
    swapFormElements: (idx1, idx2) =>
      set(
        (state) => {
          const swpArr = arrayMove(state.formElements, idx1, idx2);
          return {
            formElements: swpArr,
          };
        },
        undefined,
        "FormElements/swapElements"
      ),
  }))
);
