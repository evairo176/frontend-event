import eventServices from "@/services/event.service";
import { IEventForm, IEventUpdate } from "@/types/Event";
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

  const updateEvent = async (payload: IEventForm) => {
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

  const handleUpdateEvent = (data: IEventUpdate) => {
    const payload = {
      ...data,
      description: String(data?.description),
      categoryId: String(data.categoryId),
      name: String(data?.name),
      isFeatured: Boolean(data.isFeatured),
      isPublished: Boolean(data.isPublished),
      isOnline: Boolean(data.isOnline),
      region: Number(data.region),
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      startDate: toDateStandard(data.startDate),
      endDate: toDateStandard(data.endDate),
    };
    mutateUpdateEvent(payload);
  };

  return {
    dataEvent,

    handleUpdateEvent,
    isPendingMutateUpdateEvent,
    isSuccessMutateUpdateEvent,
  };
};

export default useDetailEvent;
