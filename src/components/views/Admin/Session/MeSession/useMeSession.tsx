import useChangeUrl from "@/hooks/useChangeUrl";
import sessionServices from "@/services/session.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useMeSession = () => {
  const { isReady } = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();
  const getSession = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;

    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const { data } = await sessionServices.getSessionByUserId(params);

    return data;
  };

  const {
    data: dataSession,
    refetch: refetchSession,
    isLoading: isLoadingSession,
    isRefetching: isRefetchingSession,
  } = useQuery({
    queryKey: ["me-session", currentPage, currentLimit, currentSearch],
    queryFn: getSession,
    enabled: isReady && !!currentLimit && !!currentPage,
  });
  return { dataSession, refetchSession, isLoadingSession, isRefetchingSession };
};

export default useMeSession;
