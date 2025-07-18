import bannerServices from "@/services/banner.service";
import { DEFAULT_PAGE, LIMIT_BANNER } from "./Home.constants";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

const useHome = () => {
  const router = useRouter();
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

  return {
    dataBanner,
    isLoadingBanner,
  };
};

export default useHome;
