"use server";

import connectToDB from "@/lib/db";

connectToDB();

export async function addProduct(data: any) {
  try {
    // projectName: formData.get("image"),
  } catch (e: any) {
    console.log(e.message);
    return {
      success: false,
      message: e.message,
    };
  }
}
