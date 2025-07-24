import bannerServices from "@/services/banner.service";
import {
  DEFAULT_PAGE,
  LIMIT_BANNER,
  LIMIT_CATEGORY,
  LIMIT_EVENT,
} from "./Home.constants";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import eventServices from "@/services/event.service";
import categoryServices from "@/services/category.service";
import { ChangeEvent, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { DELAY } from "@/components/constants/list.constants";

const useHome = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const debounce = useDebounce();
  const getBanners = async () => {
    let params = `limit=${LIMIT_BANNER}&page=${DEFAULT_PAGE}`;

    const res = await bannerServices.getBanners(params);

    const { data } = res;

    return data;
  };

  const { data: dataBanner, isLoading: isLoadingBanner } = useQuery({
    queryKey: ["banners", LIMIT_BANNER, DEFAULT_PAGE],
    queryFn: getBanners,
    enabled: router.isReady && !!LIMIT_BANNER && !!DEFAULT_PAGE,
  });

  const getEvents = async () => {
    let params = `limit=${LIMIT_EVENT}&page=${DEFAULT_PAGE}&isPublished=true&isFeatured=true`;

    const res = await eventServices.getEvents(params);

    const { data } = res;

    return data;
  };

  const { data: dataEvent, isLoading: isLoadingEvent } = useQuery({
    queryKey: ["events", LIMIT_EVENT, DEFAULT_PAGE],
    queryFn: getEvents,
    enabled: router.isReady && !!LIMIT_EVENT && !!DEFAULT_PAGE,
  });

  const getCategories = async () => {
    let params = `limit=${LIMIT_CATEGORY}&page=${DEFAULT_PAGE}`;

    const res = await categoryServices.getCategories(params);

    const { data } = res;

    return data;
  };

  const { data: dataCategory, isLoading: isLoadingCategory } = useQuery({
    queryKey: ["categories", LIMIT_CATEGORY, DEFAULT_PAGE],
    queryFn: getCategories,
    enabled: router.isReady && !!LIMIT_CATEGORY && !!DEFAULT_PAGE,
  });

  const getEventSearchs = async () => {
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
    queryFn: getEventSearchs,
    enabled: router.isReady && !!search,
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    debounce(() => {
      const searchValue = e.target.value;
      setSearch(searchValue);
    }, DELAY);
  };

  return {
    dataBanner,
    isLoadingBanner,

    dataEvent,
    isLoadingEvent,

    dataCategory,
    isLoadingCategory,

    dataEventSearch,
    isLoadingEventSearch,
    isRefetchingEventSearch,
    handleSearch,
    search,
    setSearch,
  };
};

export default useHome;
