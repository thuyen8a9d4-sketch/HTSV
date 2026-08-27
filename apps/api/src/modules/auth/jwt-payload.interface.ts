export interface JwtPayload {
  sub: number;
  username: string;
  email: string;
  fullName: string;
  roles: string[];
}
