import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserRegister } from './models/user-register.interface';
import authService from './services/auth.service';
import { UserLogin } from './models/user-login.interface';
import { Jwt } from './models/jwt.interface';
import { User } from './models/user.interface';
import { LoginResponse } from './models/login-response.interface';

const storedJwt: string | null = authService.getStoredJwt();
const jwt: Jwt | null = !!storedJwt ? { token: JSON.parse(storedJwt) } : null;
const user: User | null = !!jwt ? authService.decodeJwt(jwt).user : null;

// TODO: move higher
interface AsyncState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string | null;
}

interface AuthState extends AsyncState {
    user: User | null;
    jwt: Jwt | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: user,
    jwt: jwt,
    isAuthenticated: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: null,
};

export const verifyAccessToken = createAsyncThunk(
    'auth/verifyToken',
    async (_e, thunkAPI) => {
        if (jwt) {
            try {
                const verified = await authService.verifyJwt(jwt);
                if (verified) {
                    return true;
                } else {
                    return thunkAPI.rejectWithValue("Invalid Token");
                }
            } catch (error) {
                return thunkAPI.rejectWithValue('Unable to login');
            }
        } else {
            return thunkAPI.rejectWithValue('No token set');
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (formData: UserLogin, thunkAPI) => {
        try {
            const response: LoginResponse = await authService.login(formData);
            if (!(response.jwt && response.user)) {
                if (response.error) {
                    return thunkAPI.rejectWithValue(response.error);
                }
                return thunkAPI.rejectWithValue('Unable to login');
            }
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue('Unable to login');
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (registerData: UserRegister, thunkAPI) => {
        try {
            return await authService.register(registerData);
        } catch (error) {
            return thunkAPI.rejectWithValue('Unable to register');
        }
    }
);

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.errorMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyAccessToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyAccessToken.fulfilled, (state, action) => {
                state.isAuthenticated = action.payload;
                state.isLoading = false;
            })
            .addCase(verifyAccessToken.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.jwt = null;
                localStorage.removeItem('jwtToken');
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.jwt = action.payload.jwt;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, rejected) => {
                console.log(rejected.payload);
                state.isError = true;
                if (typeof rejected.payload === 'string') {
                    state.errorMessage = rejected.payload;
                }
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.jwt = null;
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
            })
            .addCase(register.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            });
    },
});

export const { reset } = AuthSlice.actions;

export default AuthSlice.reducer;