"use client";

import { EditUserRequest, User } from "@/utils/types";
import { FC } from "react";
import Input from "../input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import updateProfileAction from "@/utils/actions/profile/updateProfile";

const EditProfileForm: FC<{
  user: Omit<User, "password">;
}> = ({ user }) => {
  const router = useRouter();

  const {execute, isExecuting} = useAction(updateProfileAction, {
    onSuccess: ({ data }) => {
      router.refresh();
    },
    onError: ({ error }) => {
      if (error.serverError) {
        console.log(error.serverError);
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<EditUserRequest>();

  const handleSave = handleSubmit(async (data) => {
    await execute({
      id: user.id,
      ...data,
    });
  });

  return (
    <form
      onSubmit={handleSave}
      className="divide-y divide-gray-100 px-6 py-8 sm:px-8"
    >
      <div className="pt-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-100">
          Основные данные
        </h3>
        <Input
          {...register("name", {
            required: "Полное имя обязательно",
            minLength: {
              value: 5,
              message: "Неправильный формат полного имени",
            },
            maxLength: {
              value: 50,
              message: "Неправильный формат полного имени",
            },
          })}
          defaultValue={user.name}
          label="Полное имя"
          id="name"
        />
      </div>

      <div className="pt-4">
        <Input
          {...register("email", {
            required: "Электронная почта обязательна",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Неправильный формат электронной почты",
            },
            minLength: {
              value: 5,
              message: "Неправильный формат электронной почты",
            },
            maxLength: {
              value: 50,
              message: "Неправильный формат электронной почты",
            },
          })}
          defaultValue={user.email}
          label="Электронная почта"
          id="email"
          type="email"
        />
      </div>

      <div className="pt-8 flex justify-end gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg text-white transition shadow-md ${
            isLoading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg"
          }`}
        >
          {isLoading || isExecuting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-80"
                  d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12s12-5.373 12-12S18.627 0 12 0z"
                ></path>
              </svg>
              Сохранение...
            </>
          ) : (
            <>Сохранить изменения</>
          )}
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
