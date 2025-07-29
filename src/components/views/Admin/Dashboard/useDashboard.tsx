import useChangeUrl from "@/hooks/useChangeUrl";
import orderServices from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDashboard = () => {
  const router = useRouter();

  const getTransaction = async () => {
    const res = await orderServices.getDashboardTransactionChart();

    const { data } = res;

    return data;
  };

  const {
    data: dataTransaction,
    isLoading: isLoadingTransaction,
    refetch: refetchTransaction,
  } = useQuery({
    queryKey: ["dashboard-chart"],
    queryFn: getTransaction,
    enabled: router.isReady,
  });

  return {
    dataTransaction,
    isLoadingTransaction,
    refetchTransaction,
  };
};

export default useDashboard;
