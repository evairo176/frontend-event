import refundServices from "@/services/refund.service";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailRefund = () => {
  const { query, isReady } = useRouter();

  const getRefundById = async (id: string) => {
    const { data } = await refundServices.getRefundById(id);

    return data?.data;
  };

  const { data: dataRefund, isLoading: isLoadingRefund } = useQuery({
    queryKey: ["refund", query?.id as string],
    queryFn: () => getRefundById(query?.id as string),
    enabled: isReady,
  });

  return {
    dataRefund,
    isLoadingRefund,
  };
};

export default useDetailRefund;
