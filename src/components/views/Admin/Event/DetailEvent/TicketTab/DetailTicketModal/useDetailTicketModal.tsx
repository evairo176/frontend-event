import useMediaHandling from "@/hooks/useMediaHandling";
import ticketServices from "@/services/ticket.service";
import { ITicket, ITicketForm, ITicketUpdate } from "@/types/Ticket";
import { errorCallback, successCallback } from "@/utils/tanstack-callback";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name of ticket").optional(),
  description: yup.string().required("Please input description").optional(),
  price: yup.string().required("Please input price").optional(),
  quantity: yup.string().required("Please input quantity").optional(),
});

const useDetailTicketModal = (
  dataTicket: ITicket | null,
  setSelectedDataTicket: Dispatch<SetStateAction<ITicket | null>>,
) => {
  const { query } = useRouter();
  const {
    control,
    handleSubmit: handleSubmitTicketForm,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleOnClose = (onClose: () => void) => {
    reset();
    onClose();
    setSelectedDataTicket(null);
  };

  const updateTicket = async (payload: ITicketUpdate) => {
    const res = await ticketServices.updateTicket(
      dataTicket?.id as string,
      payload,
    );

    return res;
  };

  const {
    mutate: mutateUpdateTicket,
    isPending: isPendingMutateUpdateTicket,
    isSuccess: isSuccessMutateUpdateTicket,
  } = useMutation({
    mutationFn: updateTicket,
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

  const handleUpdateTicket = async (data: ITicketForm) => {
    const payload = {
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
      eventId: String(query?.id),
    };
    mutateUpdateTicket(payload);
  };

  return {
    control,
    errors,
    handleSubmitTicketForm,
    handleUpdateTicket,
    isPendingMutateUpdateTicket,
    isSuccessMutateUpdateTicket,
    handleOnClose,
    setValue,
  };
};

export default useDetailTicketModal;
