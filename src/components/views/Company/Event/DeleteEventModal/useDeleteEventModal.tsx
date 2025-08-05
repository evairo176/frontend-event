import eventServices from "@/services/event.service";
import { errorCallback, successCallback } from "@/utils/tanstack-callback";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useDeleteEventModal = () => {
  const deleteEvent = async (id: string) => {
    const res = await eventServices.deleteEvent(id);

    return res;
  };

  const {
    mutate: mutateDeleteCatgeory,
    isPending: isPendingMutateDeleteEvent,
    isSuccess: isSuccessMutateDeleteEvent,
  } = useMutation({
    mutationFn: deleteEvent,
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
    isPendingMutateDeleteEvent,
    isSuccessMutateDeleteEvent,
  };
};

export default useDeleteEventModal;
