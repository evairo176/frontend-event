import mfaServices from "@/services/mfa.service";
import { errorCallback, successCallback } from "@/utils/tanstack-callback";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import React from "react";

const useRevokeMfa = () => {
  const MfaRevokeService = async () => {
    const result = await mfaServices.mfaRevoke();
    return result;
  };

  const {
    mutate: mutateMfaRevoke,
    isPending: isPendingMfaRevoke,
    isSuccess: isSuccessMfaRevoke,
  } = useMutation({
    mutationFn: MfaRevokeService,
    onError: (error: any) => {
      let { message, error: errorDetails } = errorCallback(error);

      addToast({
        title: "Failed",
        description: message,
        color: "danger",
        variant: "flat",
      });
    },
    onSuccess: (response) => {
      // console.log(response);
      const message = successCallback(response);

      //   router.replace("/");
      addToast({
        title: "Success",
        description: message,
        color: "success",
        variant: "flat",
      });
    },
  });

  const handleMfaRevoke = () => {
    // console.log("Register form data:", data);
    mutateMfaRevoke();
  };
  return {
    handleMfaRevoke,
    isPendingMfaRevoke,
    isSuccessMfaRevoke,
  };
};

export default useRevokeMfa;
