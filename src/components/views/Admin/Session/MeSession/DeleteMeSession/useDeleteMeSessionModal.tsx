import sessionServices from "@/services/session.service";
import { errorCallback, successCallback } from "@/utils/tanstack-callback";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useDeleteMeSessionModal = () => {
  const deleteMeSession = async (id: string) => {
    const res = await sessionServices.deleteSession(id);

    return res;
  };

  const {
    mutate: mutateDeleteMeSession,
    isPending: isPendingMutateDeleteMeSession,
    isSuccess: isSuccessMutateDeleteMeSession,
  } = useMutation({
    mutationFn: deleteMeSession,
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
    mutateDeleteMeSession,
    isPendingMutateDeleteMeSession,
    isSuccessMutateDeleteMeSession,
  };
};

export default useDeleteMeSessionModal;
