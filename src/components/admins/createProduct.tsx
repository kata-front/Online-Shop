"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import Input from "../UI/input";
import createProductAction from "@/utils/actions/createProductAction";
import { useAction } from "next-safe-action/hooks";
import { Product } from "@/utils/types";

const CreateProductForm: FC = () => {
  const { execute, isExecuting } = useAction(createProductAction, {
    onSuccess: ({ data }) => {
      console.log(data);
    },
    onError: ({ error }) => {
      if (error.serverError) {
        setError("root", { message: error.serverError });
      }

      if (error.validationErrors) {
        Object.entries(error.validationErrors.fieldErrors).forEach(
          ([key, error]) => {
            setError(key as keyof Product, { message: error[0] });
          },
        );
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    setError,
  } = useForm<{
    name: string;
    price: number;
    description: string;
    image?: string;
  }>();

  const onSubmit = handleSubmit(async (data: any) => {
    await execute({
      name: data.name,
      price: Number(data.price),
      description: data.description,
      image: data.image,
    });
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Input
        label="Название"
        error={errors.name?.message}
        {...register("name", { required: true })}
      />
      <Input
        label="Цена"
        error={errors.price?.message}
        {...register("price", { required: true })}
      />
      <Input
        label="Описание"
        error={errors.description?.message}
        {...register("description", { required: true })}
      />

      {errors.root && <p className="text-red-500">{errors.root.message}</p>}

      <button type="submit" disabled={isLoading || isExecuting} className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded'>
        Создать
      </button>
    </form>
  );
};

export default CreateProductForm;
