"use client";

import { deleteAllProducts, deleteSingleProduct, fetchAllProducts, fetchSingleProduct } from "@/actions/product";
import { TableWraper } from "@/components/tableWraper";
import { Button } from "@/components/ui/button";
import { Edit, Loader, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const router = useRouter();
  const [productData, setProducts] = useState<[]>([]);
  const [isProductLoading, setIsProductLoading] = useState<boolean>(false);
  const [isEditLoading, setIsEditLoading] = useState<boolean>(false);

  const columns = [
    {
      header: "Product Name & Size",
      accessorKey: "name",
      cell: ({ row }: any) => {
        const name = row.original.name;
        const size = row.original.size;
        const image = row.original.image[0].url;

        return (
          <div className="flex items-center space-x-4">
            <img src={image || "/placeholder.webp"} alt="Product Image" className="w-16 h-16 object-cover rounded" />

            <div className="text-sm">
              <div className="font-medium text-gray-800">{name}</div>
              <div className="text-gray-500 text-sm flex flex-wrap gap-2">
                Size:
                {size.map((v: any) => (
                  <span>{v?.name}</span>
                ))}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "brand",
      header: "Brand",
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "Action",
      header: "action",
      cell: ({ row }: any) => {
        return (
          <div className="flex gap-3">
            {/* edit product */}
            <div
              className="cursor-pointer"
              onClick={async () => {
                try {
                  setIsEditLoading(true);
                  const res = await fetchSingleProduct(row.original._id);
                  if (res.success) {
                    router.push("/admin/products/add");
                  }
                } catch (e: any) {
                  console.error("Edit failed:", e?.message);
                } finally {
                  setIsEditLoading(false);
                }
              }}
            >
              {isEditLoading ? <Loader /> : <Edit />}
            </div>
            {/* delete product */}
            <div
              className="cursor-pointer"
              onClick={async () => {
                try {
                  setIsProductLoading(true);
                  const res = await deleteSingleProduct(row.original._id);
                  if (res?.success) {
                    allProducts(); // fetch all products
                  }
                } catch (e: any) {
                  console.error("Delete failed:", e?.message);
                } finally {
                  setIsProductLoading(false);
                }
              }}
            >
              {isProductLoading ? <Loader /> : <Trash />}
            </div>
          </div>
        );
      },
    },
  ];

  // fetch all products
  const allProducts = async () => {
    const products = await fetchAllProducts();
    if (products) {
      setProducts(products?.data || []);
    }
  };
  useEffect(() => {
    allProducts();
  }, []);

  return (
    <>
      <div className="container px-5">
        <div className="flex justify-between">
          <div className="font-bold">Product List</div>
          <Button onClick={() => router.push("/admin/products/add")}>Add Product</Button>
        </div>
        <div className="mt-5">
          <TableWraper columns={columns} data={productData} />
        </div>
      </div>
    </>
  );
}
