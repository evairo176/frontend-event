import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IRegister } from "@/types/Auth";

const authServices = {
  register: async (body: IRegister) =>
    instance.post(`${endpoint.AUTH}/register`, body),
};

export default authServices;
