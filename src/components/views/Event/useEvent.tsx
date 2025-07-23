import useChangeUrl from "@/hooks/useChangeUrl";
import eventServices from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useEvent = () => {
  const router = useRouter();

  const {
    currentLimit,
    currentPage,
    currentCategory,
    currentIsOnline,
    currentIsFeatured,
  } = useChangeUrl();

  const getEvents = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;

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
      currentLimit,
      currentCategory,
      currentIsOnline,
      currentIsFeatured,
    ],
    queryFn: getEvents,
    enabled: router.isReady && !!currentLimit && !!currentPage,
  });

  return {
    dataEvent,
    isLoadingEvent,
    isRefetchingEvent,
    refetchEvent,
  };
};

export default useEvent;
