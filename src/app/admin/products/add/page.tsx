"use client";

import Color from "@/components/forms/Color";
import CustomInput from "@/components/forms/CustomInput";
import { CustomSelect } from "@/components/forms/CustomSelect";
import CustomSize from "@/components/forms/CustomSize";
import { Description } from "@/components/forms/Description";
import { Button } from "@/components/ui/button";
import { productColor, sizeData } from "@/constant";
import { useState } from "react";

export default function page() {
  const [hasProductSize, setHasProductSize] = useState();
  const [hasProductColor, setHasProductColor] = useState();

  const [productData, setProductData] = useState({
    image: "",
    name: "",
    brand: "",
    description: "",
    category: "",
    gender: "",
    color: "",
    price: "",
    stock: "",
  });

  const handleProductChanges = (e: any, file?: string | undefined) => {
    if (file) {
      setProductData((productData) => ({ ...productData, [e.target.name]: e.target.files[0] }));
    } else {
      const { name, value } = e.target;
      setProductData((productData) => ({ ...productData, [name]: value }));
    }
  };

  const handleSubmitProductData = (e: any) => {
    e.preventDefault();
    console.log("hasProductSize", hasProductSize, hasProductColor);
    console.log(productData);
  };
  return (
    <>
      <div className="container px-5">
        <form onSubmit={handleSubmitProductData}>
          <CustomInput type="file" label="Product Image" name="image" onChange={(e: any) => handleProductChanges(e, "file")} />
          {productData.image && typeof productData.image === "object" && (
            <>
              <img src={URL.createObjectURL(productData.image)} alt="Preview" className="mt-3 w-32 h-32 object-cover rounded-lg border" />
            </>
          )}

          <CustomInput label="Name" placeholder="Product name" name="name" value={productData?.name} onChange={(e: any) => handleProductChanges(e)} />
          <CustomSelect label="Brand" />
          <Description
            label="Description"
            placeholder="Product description"
            name="description"
            value={productData?.description}
            onChange={(e) => handleProductChanges(e)}
          />
          <CustomSelect label="Category" />
          <CustomSelect label="Gender" />

          <CustomSize label="Size" data={sizeData} setHasProductSize={setHasProductSize} />
          <Color label="Color" data={productColor} setHasProductColor={setHasProductColor} />

          <CustomInput label="Price" placeholder="Product Price" name="price" value={productData?.price} onChange={(e: any) => handleProductChanges(e)} />
          <CustomInput label="Stock" placeholder="Stock" name="stock" value={productData?.stock} onChange={(e: any) => handleProductChanges(e)} />

          <div className="text-center my-10">
            <Button type="submit">Button</Button>
          </div>
        </form>
      </div>
    </>
  );
}
