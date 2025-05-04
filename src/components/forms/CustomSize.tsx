import { Label } from "@/components/ui/label";

export default function CustomSize({ label = "" }) {
  return (
    <>
      <Label htmlFor="terms">{label}</Label>
      <>
        <div>XS</div>
      </>
    </>
  );
}
