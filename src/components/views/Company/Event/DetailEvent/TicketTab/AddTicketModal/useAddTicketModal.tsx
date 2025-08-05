import ticketServices from "@/services/ticket.service";
import { ITicket, ITicketForm } from "@/types/Ticket";
import { errorCallback, successCallback } from "@/utils/tanstack-callback";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name of ticket"),
  description: yup.string().required("Please input description"),
  price: yup.string().required("Please input price"),
  quantity: yup.string().required("Please input quantity"),
});

interface Props {
  callbackSuccess: () => void;
}

const useAddTicketModal = ({ callbackSuccess }: Props) => {
  const { query } = useRouter();
  const {
    control,
    handleSubmit: handleSubmitTicketForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleOnClose = (onClose: () => void) => {
    reset();
    onClose();
  };

  const addTicket = async (payload: ITicket) => {
    const res = await ticketServices.addTicket(payload);

    return res;
  };

  const {
    mutate: mutateAddTicket,
    isPending: isPendingMutateAddTicket,
    isSuccess: isSuccessMutateAddTicket,
  } = useMutation({
    mutationFn: addTicket,
    onSuccess: (response) => {
      const message = successCallback(response);

      addToast({
        title: "Success",
        description: message,
        color: "success",
        variant: "flat",
      });

      callbackSuccess();
      reset();
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

  const handleAddTicket = async (data: ITicketForm) => {
    const payload = {
      ...data,
      name: String(data?.name),
      description: String(data?.description),
      price: Number(data.price),
      quantity: Number(data.quantity),
      eventId: String(query?.id),
    };
    mutateAddTicket(payload);
  };

  return {
    control,
    errors,
    handleSubmitTicketForm,
    handleAddTicket,
    isPendingMutateAddTicket,
    isSuccessMutateAddTicket,
    handleOnClose,
  };
};

export default useAddTicketModal;
