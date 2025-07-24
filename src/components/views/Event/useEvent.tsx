import useChangeUrl from "@/hooks/useChangeUrl";
import eventServices from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { LIMIT_EVENT } from "./Event.constants";

const useEvent = () => {
  const router = useRouter();

  const {
    currentPage,
    currentCategory,
    currentIsOnline,
    currentIsFeatured,
    currentSearch,
  } = useChangeUrl();

  const getEvents = async () => {
    let params = `limit=${LIMIT_EVENT}&page=${currentPage}&isPublished=true`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    if (currentCategory) {
      params += `&category=${currentCategory}`;
    }

    if (currentIsOnline) {
      params += `&isOnline=${currentIsOnline}`;
    }

    if (currentIsFeatured) {
      params += `&isFeatured=${currentIsFeatured}`;
    }

    const res = await eventServices.getEvents(params);

    const { data } = res;

    return data;
  };

  const {
    data: dataEvent,
    isLoading: isLoadingEvent,
    isRefetching: isRefetchingEvent,
    refetch: refetchEvent,
  } = useQuery({
    queryKey: [
      "explore-events",
      currentPage,
      LIMIT_EVENT,
      currentCategory,
      currentIsOnline,
      currentIsFeatured,
    ],
    queryFn: getEvents,
    enabled: router.isReady && !!LIMIT_EVENT && !!currentPage,
  });

  return {
    dataEvent,
    isLoadingEvent,
    isRefetchingEvent,
    refetchEvent,
  };
};

export default useEvent;
