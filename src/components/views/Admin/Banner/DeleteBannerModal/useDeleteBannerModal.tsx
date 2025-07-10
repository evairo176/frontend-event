import bannerServices from "@/services/banner.service";
import { errorCallback, successCallback } from "@/utils/tanstack-callback";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useDeleteBannerModal = () => {
  const deleteBanner = async (id: string) => {
    const res = await bannerServices.deleteBanner(id);

    return res;
  };

  const {
    mutate: mutateDeleteCatgeory,
    isPending: isPendingMutateDeleteBanner,
    isSuccess: isSuccessMutateDeleteBanner,
  } = useMutation({
    mutationFn: deleteBanner,
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
    isPendingMutateDeleteBanner,
    isSuccessMutateDeleteBanner,
  };
};

export default useDeleteBannerModal;
