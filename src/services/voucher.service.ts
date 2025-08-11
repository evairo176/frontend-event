import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IVoucher } from "@/types/Voucher";

const voucherServices = {
  findOneByCode: async (code: string) =>
    instance.get(`${endpoint.VOUCHER}/${code}`),

  verifyScanVoucher: async (payload: IVoucher) =>
    instance.post(`${endpoint.VOUCHER}-scan`, payload),

  findAllHistoryScanByiD: async (params?: string) =>
    instance.get(`${endpoint.VOUCHER}-history-scan?${params}`),
};

export default voucherServices;
