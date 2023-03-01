import { useEffect, useState } from "react";

// Hook to add new text field in formik FieldArray on enter key press
export const useAutoField = (fieldName: string) => {
  const [length, setLength] = useState(1);

  const handleFieldKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    push: (obj: any) => void,
    length: number
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      push("");
      setLength(length);
      e.preventDefault();
    }
  };

  useEffect(() => {
    const node = document.getElementById(`${fieldName}.${length}`);
    node?.focus();
    if (node !== null) {
      node.innerText = "";
    }
  }, [length]);

  return handleFieldKeyDown;
};
