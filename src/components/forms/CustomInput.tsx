"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";

export default function CustomInput({
  type = "text",
  label = "Label",
  placeholder = "placeholder",
}) {
  const id = useId();
  return (
    <>
      <Label htmlFor="terms">{label}</Label>
      <Input type={type} placeholder={placeholder} id={id} className="my-3" />
    </>
  );
}
