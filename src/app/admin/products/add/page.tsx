"use client";

import Color from "@/components/forms/Color";
import CustomInput from "@/components/forms/CustomInput";
import { CustomSelect } from "@/components/forms/CustomSelect";
import CustomSize from "@/components/forms/CustomSize";
import { Description } from "@/components/forms/Description";
import { Button } from "@/components/ui/button";
import { productColor, sizeData } from "@/constant";
import { useState } from "react";
import Cookies from "js-cookie";

export default function page() {
  const [hasProductSize, setHasProductSize] = useState("");
  const [hasProductColor, setHasProductColor] = useState("");
  const [selectedBrandValue, setSelectedBrandValue] = useState("");
  const [categoryValue, setSelectedCategoryValue] = useState("");
  const [genderValue, setSelectedGenderValue] = useState("");
  const [hasChangesOnColorData, setHasChangesOnColorData] = useState(false);
  const [hasChangesOnProductPrizeData, setHasChangesOnProductPrize] = useState(false);

  const [productData, setProductData] = useState({
    image: "",
    name: "",
    description: "",
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

    const productValues = {
      image: productData?.image,
      name: productData?.name,
      brand: selectedBrandValue,
      description: productData?.description,
      category: categoryValue,
      gender: genderValue,
      price: hasProductSize,
      color: hasProductColor,
      stock: productData?.stock,
    };

    console.log(productValues);

    setSelectedBrandValue("");
    setSelectedCategoryValue("");
    setSelectedGenderValue("");

    setProductData({
      image: "",
      name: "",
      description: "",
      color: "",
      price: "",
      stock: "",
    });

    // get color data from cookies and if i have selected any color code then unselect the color code after submit the form
    let getColorDataFromCookies = Cookies.get("colorData");
    if (getColorDataFromCookies) {
      const data = JSON.parse(getColorDataFromCookies);
      const updatedColorCookie = data.map((v: any) => (v.isChecked === true ? { ...v, isChecked: false } : v));
      Cookies.set("colorData", JSON.stringify(updatedColorCookie));
      setHasChangesOnColorData((prve) => !prve);
    }

    // get product size form cookies and if i have selected any size then unselect after submit the form
    let getProductSizeFromCookies = Cookies.get("productSize");
    if (getProductSizeFromCookies) {
      const data = JSON.parse(getProductSizeFromCookies);
      const updatedProductSizeCookie = data.map((v: any) => (v.isChecked === true ? { ...v, isChecked: false } : v));
      Cookies.set("productSize", JSON.stringify(updatedProductSizeCookie));
      setHasChangesOnProductPrize((prve) => !prve);
    }
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
          <CustomSelect label="Brand" value={selectedBrandValue} selectedValue={setSelectedBrandValue} />
          <Description
            label="Description"
            placeholder="Product description"
            name="description"
            value={productData?.description}
            onChange={(e) => handleProductChanges(e)}
          />
          <CustomSelect label="Category" value={categoryValue} selectedValue={setSelectedCategoryValue} />
          <CustomSelect label="Gender" value={genderValue} selectedValue={setSelectedGenderValue} />

          <CustomSize label="Size" data={sizeData} setHasProductSize={setHasProductSize} changesDetectFromCookies={hasChangesOnProductPrizeData} />
          <Color label="Color" data={productColor} setHasProductColor={setHasProductColor} changesDetectFromCookies={hasChangesOnColorData} />

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
