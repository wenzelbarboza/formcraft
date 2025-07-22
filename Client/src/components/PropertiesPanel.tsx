import type { PropertiesPanelProps } from "@/lib/types";

export function PropertiesPanel({
  selectedElement,
  onUpdateElement,
}: PropertiesPanelProps) {
  if (!selectedElement) {
    return (
      <div className="w-1/4 p-4 bg-white border-l border-gray-300 h-screen">
        No element selected
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateElement({
      ...selectedElement,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-1/4 p-4 bg-white border-l border-gray-300 h-screen overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">
        Properties for {selectedElement.label}
      </h3>
      <label className="block text-sm font-medium text-gray-700">Label:</label>
      <input
        type="text"
        name="label"
        value={selectedElement.label}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      />
      {selectedElement.type === "textInput" && (
        <>
          <label className="block text-sm font-medium text-gray-700">
            Placeholder:
          </label>
          <input
            type="text"
            name="placeholder"
            value={selectedElement.placeholder || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </>
      )}
    </div>
  );
}
