"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";

interface inputProps {
  type?: string;
  label: string;
  placeholder?: string;
  name?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomInput({
  type = "text",
  label = "Label",
  placeholder = "placeholder",
  name = "",
  value = "",
  onChange,
}: inputProps) {
  const id = useId();
  return (
    <>
      <Label htmlFor="terms">{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        // value={value} // this is used when we have not file field
        className="my-3"
        onChange={onChange}
        {...(type !== "file" && value !== undefined ? { value } : {})} // when we have both input file and input text field so its check if we have input text then set value otherwise {}
      />
    </>
  );
}
