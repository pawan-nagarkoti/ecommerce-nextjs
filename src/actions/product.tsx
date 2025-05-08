"use server";

import { imageURL } from "@/lib/cloudinary";
import connectToDB from "@/lib/db";
import Product from "@/models/product";

export async function addProduct(data: any) {
  await connectToDB();
  try {
    const imageUrl = await imageURL(data.get("image")); // converted image into cloudnary image URL

    const productValues = {
      image: imageUrl,
      name: data.get("name"),
      brand: data.get("brand"),
      description: data.get("description"),
      category: data.get("category"),
      gender: data.get("gender"),
      price: data.get("price"),
      size: JSON.parse(data.get("size") as string),
      color: JSON.parse(data.get("color") as string),
      stock: data.get("stock"),
    };
    const addNewProduct = await Product.create(productValues);
    if (addNewProduct) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(addNewProduct)),
        message: "Product added successfully",
      };
    }
  } catch (e: any) {
    console.log(e.message);
    return {
      success: false,
      message: e.message,
    };
  }
}
