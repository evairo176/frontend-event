import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const orderServices = {
  getTransactionMember: async (params: string) =>
    instance.get(`${endpoint.ORDER}-history?${params}`),
  getTransaction: async (params: string) =>
    instance.get(`${endpoint.ORDER}?${params}`),
  getTransactionByOrderId: async (orderId: string) =>
    instance.get(`${endpoint.ORDER}/${orderId}`),
  getDashboardTransactionChart: async () =>
    instance.get(`${endpoint.ORDER}-dashboard/chart`),
};

export default orderServices;
