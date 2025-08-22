import refundServices from "@/services/refund.service";
import userServices from "@/services/user.service";
import { errorCallback, successCallback } from "@/utils/tanstack-callback";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const useActionStatusModal = () => {
  const [adminNote, setAdminNote] = useState<string>("");
  const refundApprove = async (payload: {
    refundId: string;
    adminNote?: string;
  }) => {
    const res = await refundServices.refundApprove(payload.refundId, {
      adminNote: payload?.adminNote,
    });

    return res;
  };

  const {
    mutate: mutateActionStatus,
    isPending: isPendingActionStatus,
    isSuccess: isSuccessActionStatus,
  } = useMutation({
    mutationFn: refundApprove,
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
    isPendingActionStatus,
    isSuccessActionStatus,
    adminNote,
    setAdminNote,
    mutateActionStatus,
  };
};

export default useActionStatusModal;
