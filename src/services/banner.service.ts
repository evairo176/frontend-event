import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICreateBackendBanner, IUpdateBackendBanner } from "@/types/Banner";

const bannerServices = {
  getBanners: async (params?: string) =>
    instance.get(`${endpoint.BANNER}?${params}`),
  getBannerById: async (id: string) => instance.get(`${endpoint.BANNER}/${id}`),
  addBanner: async (payload: ICreateBackendBanner) =>
    instance.post(`${endpoint.BANNER}`, payload),
  deleteBanner: async (id: string) =>
    instance.delete(`${endpoint.BANNER}/${id}`),
  updateBanner: async (id: string, payload: IUpdateBackendBanner) =>
    instance.put(`${endpoint.BANNER}/${id}`, payload),
};

export default bannerServices;
