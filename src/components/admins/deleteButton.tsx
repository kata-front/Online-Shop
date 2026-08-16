"use client";

import deleteProductAction from "@/utils/actions/deleteProduct";
import { useAction } from "next-safe-action/hooks";
import { FC } from "react";
import { FaTrash } from "react-icons/fa";

const DeleteProductButton: FC<{
  productId: number;
}> = ({ productId }) => {
  const { execute, isExecuting } = useAction(deleteProductAction, {
    onSuccess: ({ data }) => {
      console.log(data);
    },
    onError: ({ error }) => {
      if (error.serverError) {
        console.log(error.serverError);
      }
    },
  });

  return (
    <button
      onClick={() => {
        execute({ id: productId });
      }}
      disabled={isExecuting}
      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-md"
    >
      <FaTrash />
    </button>
  );
};

export default DeleteProductButton;
