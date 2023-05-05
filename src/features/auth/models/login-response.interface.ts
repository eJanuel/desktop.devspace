import { Jwt } from "./jwt.interface";
import { User } from "./user.interface";

export interface LoginResponse {
    jwt: Jwt | null;
    user: User | null;
    error: any | null;
}

