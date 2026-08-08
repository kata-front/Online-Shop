"use client";

import loginAction from "@/utils/actions/loginAction";
import { LoginRequest } from "@/utils/types";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const router = useRouter();

  const { execute, isExecuting } = useAction(loginAction, {
    onSuccess: ({ data }) => {
      if (!data.success) return;

      router.push("/chats");
    },
    onError: ({ error }) => {
      if (error.serverError) {
        setError('root', { message: error.serverError });
      }

      if (error.validationErrors) {
        Object.entries(error.validationErrors.fieldErrors).forEach(
          ([key, value]) => {
            setError(key as keyof LoginRequest, { message: value[0] });
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
  } = useForm<LoginRequest>();

  const onSubmit = (data: LoginRequest) => {
    execute(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
      <input
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
      />

      {errors.email && <p>{errors.email.message}</p>}

      <label htmlFor="password">Password</label>
      <input
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
      />

      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit" disabled={isLoading || isExecuting}>
        Login
      </button>
      {errors.root && <p>{errors.root.message}</p>}
    </form>
  );
};

export default LoginForm;