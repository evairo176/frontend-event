import useChangeUrl from "@/hooks/useChangeUrl";
import orderServices from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useMemberTransaction = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string>("");
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getTransaction = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;

    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await orderServices.getTransactionMember(params as string);

    const { data } = res;

    return data;
  };

  const {
    data: dataTransaction,
    isLoading: isLoadingTransaction,
    isRefetching: isRefetchingTransaction,
    refetch: refetchTransaction,
  } = useQuery({
    queryKey: ["orders-history", currentPage, currentLimit, currentSearch],
    queryFn: getTransaction,
    enabled: router.isReady && !!currentLimit && !!currentPage,
  });

  return {
    dataTransaction,
    isLoadingTransaction,
    isRefetchingTransaction,
    refetchTransaction,
    selectedId,
    setSelectedId,
  };
};

export default useMemberTransaction;
