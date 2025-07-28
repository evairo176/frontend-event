import eventServices from "@/services/event.service";
import ticketServices from "@/services/ticket.service";
import { ICart, ITicket } from "@/types/Ticket";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { DEFAULT_CART } from "./DetailEvent.constants";

const useDetailEvent = () => {
  const router = useRouter();
  const getEventBySlug = async (slug: string) => {
    const { data } = await eventServices.getEventBySlug(slug);
    return data?.data;
  };

  // const getTicketByEventId = async (eventId: string) => {
  //   const { data } = await ticketServices.getTicketsByEvent(eventId);
  //   return data?.data;
  // };

  const { data: dataDetailEvent, isLoading: isLoadingDetailEvent } = useQuery({
    queryKey: ["detailEventBySlug", router.query?.slug as string],
    queryFn: () => getEventBySlug(router.query?.slug as string),
    enabled: router.isReady,
  });

  const [carts, setCarts] = useState<ICart[]>([]);

  const getTicketDataInCart = (ticketId: string) => {
    return dataDetailEvent?.tickets.find(
      (ticket: ITicket) => ticket.id === ticketId,
    );
  };

  const handleAddToCart = (ticket: string) => {
    const existingIndex = carts.findIndex((cart) => cart.ticket === ticket);

    if (existingIndex !== -1) {
      // Jika ticket sudah ada, tambahkan quantity
      setCarts((prev) =>
        prev.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      // Jika belum ada, tambahkan item baru
      setCarts((prev) => [
        ...prev,
        {
          events: dataDetailEvent?.id,
          ticket,
          quantity: 1,
        },
      ]);
    }
  };

  const handleChangeQuantity = (
    ticketId: string,
    type: "increment" | "decrement",
  ) => {
    setCarts((prev) =>
      prev.flatMap((cart) => {
        if (cart.ticket !== ticketId) return [cart];

        const ticketData = dataDetailEvent?.tickets.find(
          (ticket: ITicket) => ticket.id === ticketId,
        );
        const maxQuantity = ticketData?.quantity ?? 0;

        if (type === "increment") {
          if (cart.quantity < maxQuantity) {
            return [{ ...cart, quantity: cart.quantity + 1 }];
          }
          return [cart]; // tidak berubah
        } else {
          if (cart.quantity <= 1) {
            return []; // hapus cart jika quantity 0
          }
          return [{ ...cart, quantity: cart.quantity - 1 }];
        }
      }),
    );
  };

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

    carts,
    getTicketDataInCart,
    handleAddToCart,
    handleChangeQuantity,
  };
};

export default useDetailEvent;
