import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const sessionServices = {
  getSessionByUserId: async (params?: string) =>
    instance.get(`${endpoint.SESSION}/all?${params}`),
};

export default sessionServices;
