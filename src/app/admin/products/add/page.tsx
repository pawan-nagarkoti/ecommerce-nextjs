"use client";

import Color from "@/components/forms/Color";
import CustomInput from "@/components/forms/CustomInput";
import { CustomSelect } from "@/components/forms/CustomSelect";
import CustomSize from "@/components/forms/CustomSize";
import { Description } from "@/components/forms/Description";
import { Button } from "@/components/ui/button";
import { brands, categories, gender, productColor, sizeData } from "@/constant";
import { useState } from "react";
import Cookies from "js-cookie";
import { addProduct } from "@/actions/product";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function page() {
  const [hasProductSize, setHasProductSize] = useState<any>([]);
  const [hasProductColor, setHasProductColor] = useState<any>([]);
  const [selectedBrandValue, setSelectedBrandValue] = useState("");
  const [categoryValue, setSelectedCategoryValue] = useState("");
  const [genderValue, setSelectedGenderValue] = useState("");
  const [hasChangesOnColorData, setHasChangesOnColorData] = useState(false);
  const [hasChangesOnProductPrizeData, setHasChangesOnProductPrize] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [previews, setPreviews] = useState<string[]>([]); // preview images state
  const router = useRouter();

  const [productData, setProductData] = useState({
    image: [],
    name: "",
    description: "",
    color: "",
    price: "",
    stock: "",
  });

  const handleProductChanges = (e: any, file?: string | undefined) => {
    if (file) {
      const files = Array.from(e.target.files || []);

      setProductData((productData) => ({ ...productData, [e.target.name]: files })); // hanlde multiple files

      // Generate new preview URLs and append to existing previews
      const newPreviews = files.map((file: any) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]); // concatenate with older images
    } else {
      const { name, value } = e.target;
      setProductData((productData) => ({ ...productData, [name]: value }));
    }
  };

  const handleSubmitProductData = async (e: any) => {
    e.preventDefault();

    try {
      const products = new FormData();

      for (const file of productData?.image) {
        // get images and loop over here
        products.append("image", file);
      }

      products.append("name", productData?.name);
      products.append("brand", selectedBrandValue);
      products.append("description", productData?.description);
      products.append("category", categoryValue);
      products.append("gender", genderValue);
      products.append("price", productData?.price);
      products.append("color", JSON.stringify(hasProductColor?.filter((v: any) => v.isChecked)));
      products.append("size", JSON.stringify(hasProductSize?.filter((v: any) => v.isChecked)));
      products.append("stock", productData?.stock);

      setIsLoading(true);
      const res = await addProduct(products);

      if (res?.success) {
        toast.success(res.message);
        router.push("/admin/products/list");
      }

      setSelectedBrandValue("");
      setSelectedCategoryValue("");
      setSelectedGenderValue("");

      setProductData({
        image: [],
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
    } catch (e: any) {
      console.log("Product error", e.message);
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="container px-5">
        <form onSubmit={handleSubmitProductData}>
          <CustomInput type="file" multiple={true} label="Product Image" name="image" onChange={(e: any) => handleProductChanges(e, "file")} />
          {/* preview images */}
          {previews && previews.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {previews.map((src, idx) => (
                <img key={idx} src={src} alt={`preview-${idx}`} className="w-28 rounded" />
              ))}
            </div>
          )}

          <CustomInput label="Name" placeholder="Product name" name="name" value={productData?.name} onChange={(e: any) => handleProductChanges(e)} />
          <CustomSelect label="Brand" placeholder="brand" value={selectedBrandValue} selectedValue={setSelectedBrandValue} data={brands} />
          <Description
            label="Description"
            placeholder="Product description"
            name="description"
            value={productData?.description}
            onChange={(e) => handleProductChanges(e)}
          />
          <CustomSelect label="Category" placeholder="category" value={categoryValue} selectedValue={setSelectedCategoryValue} data={categories} />
          <CustomSelect label="Gender" placeholder="gender" value={genderValue} selectedValue={setSelectedGenderValue} data={gender} />

          <CustomSize label="Size" data={sizeData} setHasProductSize={setHasProductSize} changesDetectFromCookies={hasChangesOnProductPrizeData} />
          <Color label="Color" data={productColor} setHasProductColor={setHasProductColor} changesDetectFromCookies={hasChangesOnColorData} />

          <CustomInput label="Price" placeholder="Product Price" name="price" value={productData?.price} onChange={(e: any) => handleProductChanges(e)} />
          <CustomInput label="Stock" placeholder="Stock" name="stock" value={productData?.stock} onChange={(e: any) => handleProductChanges(e)} />

          <div className="text-center my-10">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <p>Loading...</p> : "submit"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
