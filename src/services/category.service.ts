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
  updateCategory: async (id: string, payload: ICategory) =>
    instance.put(`${endpoint.CATEGORY}/${id}`, payload),
};

export default categoryServices;
