import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IVerificationOTP, IVerifyMfaLogin } from "@/types/Auth";

const mfaServices = {
  verifyMfa: async (payload: IVerificationOTP) =>
    instance.post(`${endpoint.MFA}/verify`, payload),
  mfaSetup: async () => instance.get(`${endpoint.MFA}/setup`),
  mfaRevoke: async () => instance.put(`${endpoint.MFA}/revoke`),
  verifyMfaLogin: async (payload: IVerifyMfaLogin) =>
    instance.post(`${endpoint.MFA}/verify-login`, payload),
};

export default mfaServices;
