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