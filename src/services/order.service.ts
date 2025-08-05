import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICart } from "@/types/Ticket";

const orderServices = {
  getTransactionMember: async (params: string) =>
    instance.get(`${endpoint.ORDER}-history?${params}`),
  getTransactionCompany: async (params: string) =>
    instance.get(`${endpoint.ORDER}-company?${params}`),
  getTransaction: async (params: string) =>
    instance.get(`${endpoint.ORDER}?${params}`),
  getTransactionByOrderId: async (orderId: string) =>
    instance.get(`${endpoint.ORDER}/${orderId}`),
  getDashboardTransactionChart: async () =>
    instance.get(`${endpoint.ORDER}-dashboard/chart`),
  getDashboardTransactionChartCompany: async () =>
    instance.get(`${endpoint.ORDER}-dashboard/chart-company`),
  createOrder: async (payload: ICart[]) =>
    instance.post(`${endpoint.ORDER}`, payload),
};

export default orderServices;
