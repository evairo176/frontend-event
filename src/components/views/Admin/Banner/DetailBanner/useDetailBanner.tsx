import bannerServices from "@/services/banner.service";
import { IUpdateBackendBanner, IUpdateFormBanner } from "@/types/Banner";
import { errorCallback } from "@/utils/tanstack-callback";
import { addToast } from "@heroui/react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailBanner = () => {
  const { query, isReady } = useRouter();
  // Get QueryClient from the context
  const queryClient = useQueryClient();

  const getBannerById = async (id: string) => {
    const { data } = await bannerServices.getBannerById(id);

    return data?.data;
  };

  const { data: dataBanner, refetch: refetchBanner } = useQuery({
    queryKey: ["banner", query?.id as string],
    queryFn: () => getBannerById(query?.id as string),
    enabled: isReady,
  });

  const updateBanner = async (payload: IUpdateBackendBanner) => {
    const { data } = await bannerServices.updateBanner(
      query.id as string,
      payload,
    );

    return data?.data;
  };

  const {
    mutate: mutateUpdateBanner,
    isPending: isPendingMutateUpdateBanner,
    isSuccess: isSuccessMutateUpdateBanner,
  } = useMutation({
    mutationFn: updateBanner,
    onSuccess: () => {
      refetchBanner();
      queryClient.invalidateQueries({ queryKey: ["categories", "1", "8", ""] });
      // resetUpdateIcon();
      // resetUpdateInfo();
      addToast({
        title: "Success",
        description: "Update banner successfully",
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

  const handleUpdateBanner = (data: IUpdateFormBanner) => {
    const payload = {
      ...data,
      title: String(data.title),
      isShow: data.isShow === "true" ? true : false,
      image: String(data.image),
    };
    mutateUpdateBanner(payload);
  };

  return {
    dataBanner,

    handleUpdateBanner,
    isPendingMutateUpdateBanner,
    isSuccessMutateUpdateBanner,
  };
};

export default useDetailBanner;
