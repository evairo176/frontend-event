import { DELAY } from "@/components/constants/list.constants";
import {
  DEFAULT_PAGE,
  LIMIT_EVENT,
} from "@/components/views/Home/Home.constants";
import useDebounce from "@/hooks/useDebounce";
import eventServices from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";

const useNavbarModalSearch = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const debounce = useDebounce();

  const getEventSearch = async () => {
    let params = `limit=${LIMIT_EVENT}&page=${DEFAULT_PAGE}&isPublished=true`;

    if (search) {
      params += `&search=${search}`;
    }
    const res = await eventServices.getEvents(params);

    const { data } = res;

    return data;
  };

  const {
    data: dataEventSearch,
    isLoading: isLoadingEventSearch,
    isRefetching: isRefetchingEventSearch,
  } = useQuery({
    queryKey: ["events-search", search],
    queryFn: getEventSearch,
    enabled: router.isReady && !!search,
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      const searchValue = e.target.value;
      setSearch(searchValue);
    }, DELAY);
  };
  return {
    dataEventSearch,
    isLoadingEventSearch,
    isRefetchingEventSearch,
    handleSearch,
    search,
    setSearch,
  };
};

export default useNavbarModalSearch;
