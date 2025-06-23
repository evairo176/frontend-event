import { User, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

interface ILogin {
  identifier: string;
  password: string;
}
interface IRefreshToken {
  "refresh-token": string;
}
interface IRegister {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IVerificationEmail {
  code: string;
}

interface IUserExtended extends User {
  accessToken?: string;
  refreshToken?: string;
  role?: string;
}

interface ISessionExtended extends Session {
  accessToken?: string;
  refreshToken?: string;
}

interface IJWTExtended extends JWT {
  user?: IUserExtended;
}

export type {
  ILogin,
  IRegister,
  IVerificationEmail,
  IUserExtended,
  ISessionExtended,
  IJWTExtended,
  IRefreshToken,
};
