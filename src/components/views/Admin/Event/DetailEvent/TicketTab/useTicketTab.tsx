import useChangeUrl from "@/hooks/useChangeUrl";
import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTicketTab = () => {
  const { query, isReady } = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getTicketByEvent = async (id: string) => {
    let params = `limit=${currentLimit}&page=${currentPage}`;

    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await ticketServices.getTicketsByEvent(id, params);

    const { data } = res;

    return data;
  };

  const {
    data: dataTicket,
    isLoading: isLoadingTicket,
    isRefetching: isRefetchingTicket,
    refetch: refetchTicket,
  } = useQuery({
    queryKey: [
      "tickets",
      query?.id as string,
      currentPage,
      currentLimit,
      currentSearch,
    ],
    queryFn: () => getTicketByEvent(query?.id as string),
    enabled: isReady && !!currentLimit && !!currentPage && !!query?.id,
  });

  return {
    dataTicket,
    isLoadingTicket,
    isRefetchingTicket,
    refetchTicket,
  };
};

export default useTicketTab;
