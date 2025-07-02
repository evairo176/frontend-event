import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICategory } from "@/types/Category";

const categoryServices = {
  getCategories: async (params?: string) =>
    instance.get(`${endpoint.CATEGORY}?${params}`),
  getCategoryById: async (id: string) =>
    instance.get(`${endpoint.CATEGORY}/${id}`),
  addCategory: async (payload: ICategory) =>
    instance.post(`${endpoint.CATEGORY}`, payload),
  deleteCategory: async (id: string) =>
    instance.delete(`${endpoint.CATEGORY}/${id}`),
};

export default categoryServices;
