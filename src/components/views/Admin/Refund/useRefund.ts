import useChangeUrl from "@/hooks/useChangeUrl";
import refundServices from "@/services/refund.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useRefund = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string>("");
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getRefund = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;

    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await refundServices.getRefundForAdmin(params);

    const { data } = res;

    return data;
  };

  const {
    data: dataRefund,
    isLoading: isLoadingRefund,
    isRefetching: isRefetchingRefund,
    refetch: refetchRefund,
  } = useQuery({
    queryKey: ["refund", currentPage, currentLimit, currentSearch],
    queryFn: getRefund,
    enabled: router.isReady && !!currentLimit && !!currentPage,
  });

  return {
    dataRefund,
    isLoadingRefund,
    isRefetchingRefund,
    refetchRefund,
    selectedId,
    setSelectedId,
  };
};

export default useRefund;
