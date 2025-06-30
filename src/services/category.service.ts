import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICategory, ICategoryForm } from "@/types/Category";

const categoryServices = {
  getCategories: async (params?: string) =>
    instance.get(`${endpoint.CATEGORY}?${params}`),
  addCategory: async (payload: ICategory) =>
    instance.post(`${endpoint.CATEGORY}`, payload),
};

export default categoryServices;
