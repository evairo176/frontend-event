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
    try {
      const res = await userServices.updateActivate(payload);

      return res;
    } catch (error) {
      console.error("🌐 API Error:", error);
      throw error;
    }
  };

  const {
    mutate: mutateUpdateActivate,
    isPending: isPendingUpdateActivate,
    isSuccess: isSuccessUpdateActivate,
  } = useMutation({
    mutationFn: updateActivate,
    onSuccess: (response) => {
      console.log("🎉 Mutation onSuccess triggered:", response);
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
      console.error("💥 Mutation onError triggered:", error);
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
