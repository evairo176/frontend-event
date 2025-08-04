import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const userServices = {
  getUser: async (params?: string) =>
    instance.get(`${endpoint.USER}?${params}`),
  updateActivate: async (payload: { userId: string; value: boolean }) =>
    instance.put(`${endpoint.USER}/activate`, payload),
};

export default userServices;
