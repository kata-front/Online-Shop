import prisma from "./prisma";

export type User = {
    id: number;
    name: string;
    email: string;
}

export type RegisterRequest = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type LoginRequest = {
    email: string;
    password: string;
}

export type Product = {
    name: string;
    description: string;
    price: number;
    image?: string;
}

export type EditUserRequest = {
    name: string;
    email: string;
    password: string;
}