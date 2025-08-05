import { User, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

interface ILogin {
  identifier: string;
  password: string;
  code?: string;
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

interface IRegisterCompany {
  companyName: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IVerificationEmail {
  code: string;
}
interface IVerifyMfaLogin {
  code: string;
  email: string;
}

interface IVerificationOTP {
  code: string;
  secretKey: string;
}

interface IResetPassword {
  verificationCode: string;
  password: string;
  confirmPassword: string;
}

interface IUserExtended extends User {
  accessToken?: string;
  refreshToken?: string;
  role?: string;
}

interface ISessionExtended extends Session {
  user?: {
    accessToken?: string;
    refreshToken?: string;
    role?: string;
    mfaRequired?: boolean;
  };
}

interface IJWTExtended extends JWT {
  user?: IUserExtended;
}

interface IUpdateProfile {
  fullname?: string;
  profilePicture?: string | FileList;
}

interface IUpdatePassword {
  oldPassword?: string;
  password?: string;
  confirmPassword?: string;
}

export type {
  ILogin,
  IRegister,
  IRegisterCompany,
  IVerificationEmail,
  IUserExtended,
  ISessionExtended,
  IJWTExtended,
  IRefreshToken,
  IUpdateProfile,
  IUpdatePassword,
  IResetPassword,
  IVerificationOTP,
  IVerifyMfaLogin,
};
