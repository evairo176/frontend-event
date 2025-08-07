import userServices from "@/services/user.service";
import { errorCallback, successCallback } from "@/utils/tanstack-callback";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import React from "react";

const useActivatedUserRadio = () => {
  const updateActivate = async (payload: {
    userId: string;
    value: boolean;
  }) => {
    const res = await userServices.updateActivate(payload);

    return res;
  };

  const {
    mutate: mutateUpdateActivate,
    isPending: isPendingUpdateActivate,
    isSuccess: isSuccessUpdateActivate,
  } = useMutation({
    mutationFn: updateActivate,
    onSuccess: (response) => {
      const message = successCallback(response);

      addToast({
        title: "Success",
        description: message,
        color: "success",
        variant: "flat",
      });

      // Refetch user data to update the UI
      //   refetchUser();
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
    isPendingUpdateActivate,
    isSuccessUpdateActivate,
    mutateUpdateActivate,
  };
};

export default useActivatedUserRadio;
