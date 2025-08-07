import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IAddUser } from "@/types/User";

const userServices = {
  getUser: async (params?: string) =>
    instance.get(`${endpoint.USER}?${params}`),
  getUserCompany: async (params?: string) =>
    instance.get(`${endpoint.USER}-company?${params}`),
  updateActivate: async (payload: { userId: string; value: boolean }) =>
    instance.put(`${endpoint.USER}/activate`, payload),
  addUser: async (payload: IAddUser) =>
    instance.post(`${endpoint.USER}-add`, payload),
};

export default userServices;
