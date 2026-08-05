"use client";

import { RegisterRequest } from "@/utils/types";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<RegisterRequest>();

  return (
    <form>
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

      <label htmlFor="name">Name</label>
      <input
        {...register("name", {
          required: "Name is required",
        })}
        id="name"
        type="text"
        placeholder="Name"
      />

      <label htmlFor="password">Password</label>
      <input
        {...register("password", {
          required: "Password is required",
          minLength: 6,
        })}
        id="password"
        type="password"
        placeholder="Password"
      />

      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        {...register("confirmPassword", {
          required: "Confirm Password is required",
        })}
        id="confirmPassword"
        type="password"
        placeholder="Confirm Password"
      />

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
