"use client";

import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

type colorType = {
  id: number;
  name: string;
  isChecked: boolean;
};

interface colorProps {
  label?: string;
  data: colorType[];
}

export default function Color({ label = "", data = [] }: colorProps) {
  const [color, setColor] = useState<colorType[]>([]);

  useEffect(() => {
    const hasColorInCookies = Cookies.get("colorData");

    if (hasColorInCookies) {
      setColor(JSON.parse(hasColorInCookies));
    } else {
      setColor(data);
      Cookies.set("colorData", JSON.stringify(data));
    }
  }, []);

  const handleSelectedColor = (selectedColor: colorType) => {
    const updated = color.map((v) =>
      v.id === selectedColor.id ? { ...v, isChecked: !v.isChecked } : v
    );
    setColor(updated);
    Cookies.set("colorData", JSON.stringify(updated));
  };

  const colorClassMap: Record<string, string> = {
    red: "bg-red-500",
    yellow: "bg-yellow-400",
    green: "bg-green-500",
    pink: "bg-pink-400",
    orange: "bg-orange-400",
  };

  return (
    <>
      {label && <Label htmlFor="terms">{label}</Label>}
      <div className="flex gap-3 my-3">
        {color.map((v) => (
          <p
            key={v.id}
            className={`border px-3 py-2 text-sm rounded-sm cursor-pointer ${
              v.isChecked ? `${colorClassMap[v.name]} text-white` : ""
            }`}
            onClick={() => handleSelectedColor(v)}
          >
            {v.name}
          </p>
        ))}
      </div>
    </>
  );
}
