import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const refundServices = {
  getRefundForAdmin: async (params?: string) =>
    instance.get(`${endpoint.REFUND}?${params}`),
};

export default refundServices;
