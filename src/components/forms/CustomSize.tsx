"use client";

import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

type SizeItem = {
  id: number;
  name: String;
  isChecked: Boolean;
};
interface sizeProps {
  label?: String;
  data: SizeItem[];
  setHasProductSize: any;
}

export default function CustomSize({ label = "", data = [], setHasProductSize }: sizeProps) {
  const [sizeItem, setSizeItem] = useState<SizeItem[]>([]);
  useEffect(() => {
    const stored = Cookies.get("productSize");

    if (stored) {
      setSizeItem(JSON.parse(stored));
    } else {
      setSizeItem(data);
      Cookies.set("productSize", JSON.stringify(data));
    }
  }, []);

  const handleSizeItem = (clickedItem: SizeItem) => {
    const updated = sizeItem?.map((item) => (item.id === clickedItem.id ? { ...item, isChecked: !item.isChecked } : item));
    setSizeItem(updated);
    Cookies.set("productSize", JSON.stringify(updated));

    setHasProductSize(updated); // product size data lifting
  };

  return (
    <>
      {label && <Label htmlFor="terms">{label}</Label>}
      <div className="flex gap-3 my-3">
        {sizeItem &&
          sizeItem.length > 0 &&
          sizeItem?.map((v, i) => (
            <p
              key={i}
              className={`border px-3 py-2 text-sm rounded-sm cursor-pointer ${v?.isChecked ? "bg-black text-white" : ""}`}
              onClick={() => handleSizeItem(v)}
            >
              {v?.name}
            </p>
          ))}
      </div>
    </>
  );
}
