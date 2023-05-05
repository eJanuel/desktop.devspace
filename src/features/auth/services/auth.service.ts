import { Buffer } from 'buffer';

import { User } from '../models/user.interface';
import { UserLogin } from '../models/user-login.interface';
import { UserRegister } from '../models/user-register.interface';
import { Jwt } from '../models/jwt.interface';
import { JwtDecoded } from '../models/jwt-decoded.interface';
import { LoginResponse } from '../models/login-response.interface';

const API_URL = "http://localhost:3000";

const decodeJwt = (jwt: Jwt): JwtDecoded => {
    let encodedBuffer = Buffer.from(jwt.token.split(".")[1], "base64");
    return JSON.parse(encodedBuffer.toString());
}

const getStoredJwt = () => {
    return localStorage.getItem('jwt');
};

const register = async (registerData: UserRegister): Promise<{ jwt: Jwt | null; user: User | null }> => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(registerData),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    const data = await response.json();

    if (!data.access_token) {
        return { jwt: null, user: null };

    }

    const jwt: Jwt = { token: data.access_token }
    const decoded: JwtDecoded = decodeJwt(jwt);

    localStorage.setItem('jwt', JSON.stringify(data.access_token));

    return { jwt, user: decoded.user };
};

const login = async (loginData: UserLogin): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    const data = await response.json();
    if (!data.access_token) {
        if (data.statusCode = 401) {
            data.message = "Wrong credentials";
        }

        return { error: data.message, jwt: null, user: null };
    }

    const jwt: Jwt = { token: data.access_token }
    const decoded: JwtDecoded = decodeJwt(jwt);

    localStorage.setItem('jwt', JSON.stringify(data.access_token));

    return { jwt, user: decoded.user, error: null };
};

const logout = (): void => {
    localStorage.removeItem('jwt');
};

const verifyJwt = async (jwt: Jwt): Promise<boolean> => {
    const response = await fetch('http://localhost:3000/auth', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${jwt.token}`,
        },
    });

    if (!(response.status === 201)) {
        return false;
    }

    return true
};

const authService = {
    register,
    login,
    logout,
    verifyJwt,
    getStoredJwt,
    decodeJwt
};

export default authService;
