import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import { ICategory } from "@/types/Category";
import { errorCallback, successCallback } from "@/utils/tanstack-callback";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const useDetailCategory = () => {
  const { query, isReady } = useRouter();
  // Get QueryClient from the context
  const queryClient = useQueryClient();

  const getCategoryById = async (id: string) => {
    const { data } = await categoryServices.getCategoryById(id);

    return data?.data;
  };

  const { data: dataCategory, refetch: refetchCategory } = useQuery({
    queryKey: ["category", query?.id as string],
    queryFn: () => getCategoryById(query?.id as string),
    enabled: isReady,
  });

  const updateCategory = async (payload: ICategory) => {
    const { data } = await categoryServices.updateCategory(
      query.id as string,
      payload,
    );

    return data?.data;
  };

  const {
    mutate: mutateUpdateCategory,
    isPending: isPendingMutateUpdateCategory,
    isSuccess: isSuccessMutateUpdateCategory,
  } = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      refetchCategory();
      queryClient.invalidateQueries({ queryKey: ["category", "1", "8", ""] });
      // resetUpdateIcon();
      // resetUpdateInfo();
      addToast({
        title: "Success",
        description: "Update category successfully",
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

  const handleUpdateCategory = (data: ICategory) => mutateUpdateCategory(data);

  return {
    dataCategory,

    handleUpdateCategory,
    isPendingMutateUpdateCategory,
    isSuccessMutateUpdateCategory,
  };
};

export default useDetailCategory;
