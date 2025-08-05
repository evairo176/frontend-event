import eventServices from "@/services/event.service";
import orderServices from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailTransaction = () => {
  const router = useRouter();
  const getTransactionByOrderId = async (orderId: string) => {
    const { data } = await orderServices.getTransactionByOrderId(orderId);
    return data?.data;
  };

  const { data: dataTransaction, isLoading: isLoadingTransaction } = useQuery({
    queryKey: ["transactionByOrderId", router.query?.orderId as string],
    queryFn: () => getTransactionByOrderId(router.query?.orderId as string),
    enabled: router.isReady,
  });

  const getEventBySlug = async (slug: string) => {
    const { data } = await eventServices.getEventBySlug(slug);
    return data?.data;
  };

  const { data: dataDetailEvent, isLoading: isLoadingDetailEvent } = useQuery({
    queryKey: ["detailEventBySlug", router.query?.slug as string],
    queryFn: () => getEventBySlug(router.query?.slug as string),
    enabled: router.isReady,
  });

  return {
    dataDetailEvent,
    isLoadingDetailEvent,

    dataTransaction,
    isLoadingTransaction,
  };
};

export default useDetailTransaction;
