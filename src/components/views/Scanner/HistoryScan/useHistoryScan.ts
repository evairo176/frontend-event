import useChangeUrl from "@/hooks/useChangeUrl";

import voucherServices from "@/services/voucher.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useHistoryScan = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string>("");
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getHistoryScan = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;

    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await voucherServices.findAllHistoryScanByiD(params);

    const { data } = res;

    return data;
  };

  const {
    data: dataHistoryScan,
    isLoading: isLoadingHistoryScan,
    isRefetching: isRefetchingHistoryScan,
    refetch: refetchHistoryScan,
  } = useQuery({
    queryKey: ["categories", currentPage, currentLimit, currentSearch],
    queryFn: getHistoryScan,
    enabled: router.isReady && !!currentLimit && !!currentPage,
  });

  return {
    dataHistoryScan,
    isLoadingHistoryScan,
    isRefetchingHistoryScan,
    refetchHistoryScan,
    selectedId,
    setSelectedId,
  };
};

export default useHistoryScan;
