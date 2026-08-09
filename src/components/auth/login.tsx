"use client";

import loginAction from "@/utils/actions/loginAction";
import { LoginRequest } from "@/utils/types";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Input from "../UI/input";

const LoginForm = () => {
  const router = useRouter();

  const { execute, isExecuting } = useAction(loginAction, {
    onSuccess: ({ data }) => {
      if (!data.success) return;
      router.push("/chats");
    },
    onError: ({ error }) => {
      if (error.serverError) {
        setError("root", { message: error.serverError });
      }
      if (error.validationErrors) {
        Object.entries(error.validationErrors.fieldErrors).forEach(
          ([key, value]) => {
            setError(key as keyof LoginRequest, { message: value[0] });
          }
        );
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    setError,
  } = useForm<LoginRequest>();

  const onSubmit = (data: LoginRequest) => execute(data);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl space-y-6"
      >
        <h1 className="text-2xl font-bold text-white text-center">Вход</h1>

        <div className="space-y-4">
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email format",
              },
            })}
            id="email"
            type="email"
            placeholder="Email"
            label="Email"
            error={errors.email?.message}
          />

          <Input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              maxLength: {
                value: 30,
                message: "Password must be at most 30 characters",
              },
            })}
            id="password"
            type="password"
            placeholder="Password"
            label="Password"
            error={errors.password?.message}
          />
        </div>

        {errors.root && (
          <div className="bg-red-500/10 border border-red-400/30 text-red-300 px-4 py-2 rounded-lg text-sm text-center">
            {errors.root.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || isExecuting}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:opacity-50 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {isExecuting ? (
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
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          ) : (
            "Войти"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;