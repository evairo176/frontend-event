import eventServices from "@/services/event.service";
import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailEvent = () => {
  const router = useRouter();
  const getEventBySlug = async (slug: string) => {
    const { data } = await eventServices.getEventBySlug(slug);
    return data?.data;
  };

  const getTicketByEventId = async (eventId: string) => {
    const { data } = await ticketServices.getTicketsByEvent(eventId);
    return data?.data;
  };

  const { data: dataDetailEvent, isLoading: isLoadingDetailEvent } = useQuery({
    queryKey: ["detailEventBySlug", router.query?.slug as string],
    queryFn: () => getEventBySlug(router.query?.slug as string),
    enabled: router.isReady,
  });

  //   const { data: dataTicket, isLoading: isLoadingTicket } = useQuery({
  //     queryKey: ["ticketByEventId", router.query?.eventId as string],
  //     queryFn: () => getTicketByEventId(router.query?.eventId as string),
  //     enabled: router.isReady,
  //   });

  return {
    dataDetailEvent,
    isLoadingDetailEvent,

    // dataTicket,
    // isLoadingTicket,
  };
};

export default useDetailEvent;
