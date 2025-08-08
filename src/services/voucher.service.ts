import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const voucherServices = {
  findOneByCode: async (code: string) =>
    instance.get(`${endpoint.VOUCHER}/${code}`),
};

export default voucherServices;
