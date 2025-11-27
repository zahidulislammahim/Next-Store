"use client";
import { useClerk, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import Loading from "../(components)/Loading";
import ProtectRoute from "../(components)/ProtectRoute";
import Swal from "sweetalert2";
import Image from "next/image";
import EditProduct from "../(components)/EditProduct";
import Link from "next/link";
import axios from "axios";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const [selectedIssue, setSelectedProduct] = useState(null);
  const { openSignIn } = useClerk();
  const [products, setProduct] = useState([]);

  const email = user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    if (!email) return;

    const fetchproducts = async () => {
      try {
        const res = await fetch(
          `https://next-store-ejp-backend.vercel.app/my-products?email=${email}`
        );
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchproducts();
  }, [email]);

  // My products Delete
  const handleDelete = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#667eea",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!isConfirmed) return;

    try {
      const { data } = await axios.delete(
        `https://next-store-ejp-backend.vercel.app/products/${id}`
      );

      if (data.deletedCount > 0) {
        setProduct((prev) => prev.filter((p) => p._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Your product has been deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire("Failed!", "Failed to delete the product.", "error");
      }
    } catch (err) {
      console.error("Delete Error:", err);
      Swal.fire("Error!", "Something went wrong. Check console.", "error");
    }
  };
  useEffect(() => {
    if (!user) {
      const t = setTimeout(() => {
        setLoading(false);
      }, 500);

      return () => clearTimeout(t);
    }
  }, [user]);

  if (!user) {
    if (loading) {
      return <Loading></Loading>;
    }
    openSignIn();
    return <ProtectRoute />;
  }
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          Manage <span className="text-indigo-600">Products</span>
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          View, edit, and manage all your products in one place.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="col-span-full text-center py-24">
          <span className="text-5xl font-bold text-indigo-300">
            You haven’t Add any Product yet.
          </span>
        </div>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-indigo-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Image
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-100 divide-y divide-gray-300">
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 transition duration-150">
                    <td className="px-4 py-3">
                      <div className="w-20 h-16 relative">
                        <Image
                          src={product.imageUrl}
                          alt={product.title}
                          fill
                          sizes="80px"
                          className="object-cover rounded-md border"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {product.title}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {product.category}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {product.createdDate}
                    </td>
                    <td className="px-4 py-3">
                      {product.stock > 0 ? (
                        <span className="text-green-600 font-semibold">
                          In Stock ({product.stock})
                        </span>
                      ) : (
                        <span className="text-red-600 font-semibold">
                          Stock Out
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/all-products/${product._id}`}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md pt-2 text-sm transition">
                          View
                        </Link>
                        <button className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded-md pt-2 text-sm transition cursor-pointer">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md pt-2 text-sm transition cursor-pointer">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card  */}
          <div className="md:hidden flex flex-col gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300">
                <div className="relative w-full h-40 sm:h-48">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {product.title}
                  </h2>
                  <p className="text-gray-600">
                    <span className="font-medium">Category:</span>{" "}
                    {product.category}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Date:</span>{" "}
                    {product.createdDate}
                  </p>
                  {product.stock > 0 ? (
                    <span className="text-green-600 font-semibold">
                      In Stock ({product.stock})
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      Stock Out
                    </span>
                  )}
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Link
                      href={`/all-products/${product._id}`}
                      className="bg-green-500 pt-2 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition">
                      View
                    </Link>
                    <button
                      onClick={() => handleEdit(product._id)}
                      className="bg-sky-500 pt-2 hover:bg-sky-600 text-white px-3 py-1 rounded-md text-sm transition">
                      Edit
                    </button>
                    <EditProduct
                      open={openModal}
                      onClose={handleClose}
                      data={selectedIssue}
                    />
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-600 pt-2 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
