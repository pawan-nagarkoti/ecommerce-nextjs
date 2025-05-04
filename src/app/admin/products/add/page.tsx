import Color from "@/components/forms/Color";
import CustomInput from "@/components/forms/CustomInput";
import { CustomSelect } from "@/components/forms/CustomSelect";
import CustomSize from "@/components/forms/CustomSize";
import { Description } from "@/components/forms/Description";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <>
      <div className="container px-5">
        <form action="">
          <CustomInput type="file" label="Product Image" />
          <CustomInput label="Name" placeholder="Product name" />
          <CustomSelect label="Brand" />
          <Description label="Description" />
          <CustomSelect label="Category" />
          <CustomSelect label="Gender" />

          <CustomSize label="Size" />
          <Color label="Color" />

          <CustomInput label="Price" placeholder="Product Price" />
          <CustomInput label="Stock" placeholder="Stock" />

          <div className="text-center my-10">
            <Button type="submit">Button</Button>
          </div>
        </form>
      </div>
    </>
  );
}
