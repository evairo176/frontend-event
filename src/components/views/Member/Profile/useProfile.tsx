import authServices from "@/services/auth.service";
import { IUpdatePassword, IUpdateProfile } from "@/types/Auth";
import { toDateStandard } from "@/utils/date";
import { errorCallback } from "@/utils/tanstack-callback";
import { addToast } from "@heroui/react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useProfile = () => {
  const { isReady } = useRouter();
  // Get QueryClient from the context
  const queryClient = useQueryClient();

  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data?.data;
  };

  const { data: dataProfile, refetch: refetchProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: isReady,
  });

  const updateProfile = async (payload: IUpdateProfile) => {
    const { data } = await authServices.updateProfile(payload);
    return data?.data;
  };

  const updatePassword = async (payload: IUpdatePassword) => {
    const { data } = await authServices.updatePassword(payload);
    return data?.data;
  };

  const {
    mutate: mutateUpdateProfile,
    isPending: isPendingMutateUpdateProfile,
    isSuccess: isSuccessMutateUpdateProfile,
  } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      refetchProfile();
      queryClient.invalidateQueries({ queryKey: ["profiles", "1", "8", ""] });
      // resetUpdateBanner();
      // resetUpdateInfo();
      addToast({
        title: "Success",
        description: "Update profile successfully",
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

  const {
    mutate: mutateUpdatePassword,
    isPending: isPendingMutateUpdatePassword,
    isSuccess: isSuccessMutateUpdatePassword,
  } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      refetchProfile();
      queryClient.invalidateQueries({ queryKey: ["profiles", "1", "8", ""] });
      // resetUpdateBanner();
      // resetUpdateInfo();
      addToast({
        title: "Success",
        description: "Change password successfully",
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

  const handleUpdateInfoProfile = (data: IUpdateProfile) => {
    mutateUpdateProfile(data);
  };

  const handleUpdatePasswordProfile = (data: IUpdatePassword) => {
    mutateUpdatePassword(data);
  };

  return {
    dataProfile,
    refetchProfile,

    handleUpdateInfoProfile,
    isPendingMutateUpdateProfile,
    isSuccessMutateUpdateProfile,

    handleUpdatePasswordProfile,
    isPendingMutateUpdatePassword,
    isSuccessMutateUpdatePassword,
  };
};

export default useProfile;
