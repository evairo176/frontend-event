import useMediaHandling from "@/hooks/useMediaHandling";
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
  image: yup.mixed<FileList | string>().required("Please input icon"),
});

const useAddTicketModal = () => {
  const { query } = useRouter();
  const {
    control,
    handleSubmit: handleSubmitTicketForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const preview = watch("image");
  const fileUrl = getValues("image");

  const handleUploadIcon = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("image", fileUrl);
      }
    });
    // You may want to handle the files?.length !== 0 logic here if needed
  };

  const handleDeleteIcon = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = getValues("image");
    handleDeleteFile(() => onChange(undefined), fileUrl);
  };

  const handleOnClose = (onClose: () => void) => {
    if (typeof fileUrl === "string") {
      handleDeleteFile(() => {
        reset();
        onClose();
      }, fileUrl);
    } else {
      reset();
      onClose();
    }
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
    handleUploadIcon,
    handleDeleteIcon,
    handleOnClose,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    preview,
  };
};

export default useAddTicketModal;
