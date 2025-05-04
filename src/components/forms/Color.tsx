import { Label } from "@/components/ui/label";

export default function Color({ label = "" }) {
  return (
    <>
      <Label htmlFor="terms">{label}</Label>
    </>
  );
}
