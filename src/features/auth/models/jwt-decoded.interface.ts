import { User } from './user.interface';

export interface JwtDecoded {
  user: User;
  sub: number;
  exp: number;
  iat: number;
}
