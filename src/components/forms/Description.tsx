import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function Description({ label = "" }) {
  return (
    <>
      <Label htmlFor="terms">{label}</Label>
      <Textarea
        placeholder="Type your message here."
        className="my-3 h-[200px]"
      />
    </>
  );
}
