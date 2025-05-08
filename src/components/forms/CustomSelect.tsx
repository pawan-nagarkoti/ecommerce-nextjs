import * as React from "react";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface selectProps {
  label: string;
  selectedValue: any;
  value: string;
  data: { value: string; label: string }[];
  placeholder: string;
}

export function CustomSelect({ label = "", value, selectedValue, data, placeholder }: selectProps) {
  return (
    <>
      <Label htmlFor="terms">{label}</Label>
      <Select value={value} onValueChange={selectedValue}>
        <SelectTrigger className="my-3 w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {data &&
              data.length > 0 &&
              data.map((v, i) => (
                <SelectItem value={v.value} key={i}>
                  {v?.label}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
