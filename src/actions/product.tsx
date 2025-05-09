"use server";

import { imageURL } from "@/lib/cloudinary";
import connectToDB from "@/lib/db";
import Product from "@/models/product";

// Add products
export async function addProduct(data: any) {
  try {
    await connectToDB();
    const files = data.getAll("image") as File[]; // get all images
    const images = []; // stored all images with url key
    for (const file of files) {
      const url = await imageURL(file); // converted imaages into the url
      images.push({ url });
    }

    const productValues = {
      image: images,
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

// fetch all products
export async function fetchAllProducts() {
  try {
    await connectToDB();
    const products = await Product.find();
    if (products) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(products)),
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

// delete all products
export async function deleteAllProducts() {
  await Product.deleteMany();
}

// delete single products
export async function deleteSingleProduct(deleteProductID: any) {
  try {
    const deleteProduct = await Product.findByIdAndDelete(deleteProductID);
    if (!deleteProduct) {
      return {
        success: false,
        message: "no product found",
      };
    }
    if (deleteProduct) {
      return {
        success: true,
        message: "Product deleted successfully",
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

// fetch single products
export async function fetchSingleProduct(singleProductID: any) {
  try {
    const res = await Product.findById(singleProductID);
    if (res) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(res)),
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
