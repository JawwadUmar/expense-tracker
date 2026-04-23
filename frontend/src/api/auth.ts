import api from "./axios";

/* ---------- endpoints ---------- */

const loginEnpoint: string = "/login";
const signUpEnpoint: string = "/signup"


/* ---------- types ---------- */



export interface User {
    user_id: number;
    name: string;
    hashed_password: string;
    email: string;
    created_at: string;
    updated_at: string;
}

/* ---------- request types ---------- */

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignUpRequest {
    name: string;
    email: string;
    password: string;
}




/* ---------- response types ---------- */

export interface LoginResponse {
    user: User;
    token: string;
}


/* ---------- api calls ---------- */
export const login = (data: LoginRequest) => api.post(loginEnpoint, data);
// export const signup = (data: SignUpRequest) => api.post(signUpEnpoint, data);
export const signup = (data: SignUpRequest) => {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("first_name", data.name);

    return api.post(signUpEnpoint, formData);
};