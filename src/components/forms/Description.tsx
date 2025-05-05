import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useId } from "react";

interface descriptionProps {
  label: string;
  name: string;
  value?: string | number;
  placeholder: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
}

export function Description({ label = "", name = "", value = "", placeholder = "", onChange }: descriptionProps) {
  const id = useId();
  return (
    <>
      <Label htmlFor="terms">{label}</Label>
      <Textarea placeholder={placeholder} name={name} value={value} id={id} onChange={onChange} className="my-3 h-[200px]" />
    </>
  );
}
