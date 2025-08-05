import ticketServices from "@/services/ticket.service";
import { errorCallback, successCallback } from "@/utils/tanstack-callback";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useDeleteTicketModal = () => {
  const deleteTicket = async (id: string) => {
    const res = await ticketServices.deleteTicket(id);

    return res;
  };

  const {
    mutate: mutateDeleteCatgeory,
    isPending: isPendingMutateDeleteTicket,
    isSuccess: isSuccessMutateDeleteTicket,
  } = useMutation({
    mutationFn: deleteTicket,
    onSuccess: (response) => {
      const message = successCallback(response);

      addToast({
        title: "Success",
        description: message,
        color: "success",
        variant: "flat",
      });
    },
    onError: (error: any) => {
      const { message } = errorCallback(error);

      addToast({
        title: "Failed",
        description: message,
        color: "danger",
        variant: "flat",
      });
    },
  });

  return {
    mutateDeleteCatgeory,
    isPendingMutateDeleteTicket,
    isSuccessMutateDeleteTicket,
  };
};

export default useDeleteTicketModal;
