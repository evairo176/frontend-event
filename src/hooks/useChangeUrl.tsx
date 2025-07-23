import {
  DELAY,
  LIMIT_DEFAULT,
  PAGE_DEFAULT,
} from "@/components/constants/list.constants";
import { useRouter } from "next/router";
import useDebounce from "./useDebounce";
import { ChangeEvent, useEffect } from "react";

const useChangeUrl = () => {
  const router = useRouter();
  const currentLimit = router.query.limit;
  const currentPage = router.query.page;
  const currentSearch = router.query.search;
  const currentCategory = router.query.category;
  const currentIsOnline = router.query.isOnline;
  const currentIsFeatured = router.query.isFeatured;
  const debounce = useDebounce();

  useEffect(() => {
    if (router.isReady) {
      const ExplorePathName = router.pathname === "/event" && {
        category: currentCategory || "",
        isOnline: currentIsOnline || "",
        isFeatured: currentIsFeatured || "",
      };
      router.replace(
        {
          pathname: router.pathname, // tetap gunakan path dinamis seperti /admin/event/[id]
          query: {
            ...router.query,
            limit: currentLimit || LIMIT_DEFAULT,
            page: currentPage || PAGE_DEFAULT,
            search: currentSearch || "",
            ...ExplorePathName,
          },
        },
        undefined,
        { shallow: true },
      );
    }
  }, [router.isReady]);

  const handleChangePage = (page: number) => {
    router.push({
      query: {
        ...router.query,
        page,
      },
    });
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLimit = e.target.value;
    router.push({
      query: {
        ...router.query,
        limit: selectedLimit,
        page: PAGE_DEFAULT,
      },
    });
  };
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      const search = e.target.value;
      router.push({
        query: {
          ...router.query,
          search,
          page: PAGE_DEFAULT,
        },
      });
    }, DELAY);
  };

  const handleClearSearch = () => {
    router.push({
      query: {
        ...router.query,
        search: "",
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleChangeCategory = (category: string) => {
    router.push({
      query: {
        ...router.query,
        category,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleChangeIsOnline = (isOnline: string) => {
    router.push({
      query: {
        ...router.query,
        isOnline,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleChangeIsFeatured = (isFeatured: string) => {
    router.push({
      query: {
        ...router.query,
        isFeatured,
        page: PAGE_DEFAULT,
      },
    });
  };

  const resetFilterExplore = () => {
    router.push({
      query: {
        category: "",
        isOnline: "",
        isFeatured: "",
        limit: LIMIT_DEFAULT,
        page: PAGE_DEFAULT,
        search: "",
      },
    });
  };
  return {
    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
    handleChangeCategory,
    handleChangeIsOnline,
    handleChangeIsFeatured,
    currentLimit,
    currentPage,
    currentSearch,
    currentCategory,
    currentIsOnline,
    currentIsFeatured,
    resetFilterExplore,
  };
};

export default useChangeUrl;
