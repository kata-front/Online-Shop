"use client";

import createUserAction from "@/utils/actions/createUserAction";
import { RegisterRequest } from "@/utils/types";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const router = useRouter();


  const { execute, isExecuting } = useAction(createUserAction, {
    onSuccess: ({ data }) => {
      if (!data.success) return

      router.push('/chats')
    },

    onError: ({ error }) => {
      if (error.serverError) {
        setError('root', { message: error.serverError });
      }

      if (error.validationErrors) {
        Object.entries(error.validationErrors.fieldErrors).forEach(
          ([key, error]) => {
            setError(key as keyof RegisterRequest, { message: error[0] });
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
  } = useForm<RegisterRequest>();

  const onSubmit = (data: RegisterRequest) => {
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
            message: "Invalid email address",
          },
        })}
        id="email"
        type="text"
        placeholder="Email"
      />

      {errors.email && <span>{errors.email.message}</span>}

      <label htmlFor="name">Name</label>
      <input
        {...register("name", {
          required: "Name is required",
        })}
        id="name"
        type="text"
        placeholder="Name"
      />

      {errors.name && <span>{errors.name.message}</span>}

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

      {errors.password && <span>{errors.password.message}</span>}

      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        {...register("confirmPassword", {
          required: "Confirm Password is required",
          validate: (value, formValues) =>
            value === formValues.password || "Passwords do not match",
        })}
        id="confirmPassword"
        type="password"
        placeholder="Confirm Password"
      />

      {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

      <button type="submit" disabled={isLoading || isExecuting}>
        Register
      </button>

      {errors.root && <span>{errors.root.message}</span>}
    </form>
  );
};

export default RegisterForm;
