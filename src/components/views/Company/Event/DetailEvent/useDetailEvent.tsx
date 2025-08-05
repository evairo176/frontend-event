import eventServices from "@/services/event.service";
import { IEventUpdate } from "@/types/Event";
import { toDateStandard } from "@/utils/date";
import { errorCallback } from "@/utils/tanstack-callback";
import { addToast } from "@heroui/react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailEvent = () => {
  const { query, isReady } = useRouter();
  // Get QueryClient from the context
  const queryClient = useQueryClient();

  const getEventById = async (id: string) => {
    const { data } = await eventServices.getEventById(id);
    return data?.data;
  };

  const { data: dataEvent, refetch: refetchEvent } = useQuery({
    queryKey: ["event", query?.id as string],
    queryFn: () => getEventById(query?.id as string),
    enabled: isReady,
  });

  const updateEvent = async (payload: IEventUpdate) => {
    const { data } = await eventServices.updateEvent(
      query.id as string,
      payload,
    );
    return data?.data;
  };

  const {
    mutate: mutateUpdateEvent,
    isPending: isPendingMutateUpdateEvent,
    isSuccess: isSuccessMutateUpdateEvent,
  } = useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      refetchEvent();
      queryClient.invalidateQueries({ queryKey: ["events", "1", "8", ""] });
      // resetUpdateBanner();
      // resetUpdateInfo();
      addToast({
        title: "Success",
        description: "Update event successfully",
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

  const handleUpdateBannerEvent = (data: IEventUpdate) => {
    const payload = {
      ...data,
    };
    mutateUpdateEvent(payload);
  };

  const handleUpdateInfoEvent = (data: IEventUpdate) => {
    const payload = {
      ...data,
      description: String(data?.description),
      categoryId: String(data.categoryId),
      name: String(data?.name),
      isFeatured: data.isFeatured === "true" ? true : false,
      isPublished: data.isPublished === "true" ? true : false,
      isOnline: data.isOnline === "true" ? true : false,
      startDate: toDateStandard(data.startDate),
      endDate: toDateStandard(data.endDate),
    };
    mutateUpdateEvent(payload);
  };

  const handleUpdateLocationEvent = (data: IEventUpdate) => {
    const payload = {
      ...data,
      isOnline: Boolean(data.isOnline),
      regionId: String(data.regionId),
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      address: String(data.address),
    };
    mutateUpdateEvent(payload);
  };

  return {
    dataEvent,

    handleUpdateBannerEvent,
    handleUpdateInfoEvent,
    handleUpdateLocationEvent,
    isPendingMutateUpdateEvent,
    isSuccessMutateUpdateEvent,
  };
};

export default useDetailEvent;
