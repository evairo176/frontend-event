import useChangeUrl from "@/hooks/useChangeUrl";
import userServices from "@/services/user.service";
import { errorCallback, successCallback } from "@/utils/tanstack-callback";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { useState } from "react";

const useUser = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>("");
  const [defaultValue, setDefaultValue] = useState<boolean | null>(null);
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getUser = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;

    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await userServices.getUser(params);

    const { data } = res;

    return data;
  };

  const {
    data: dataUser,
    isLoading: isLoadingUser,
    isRefetching: isRefetchingUser,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["user-activate", currentPage, currentLimit, currentSearch],
    queryFn: getUser,
    enabled: router.isReady && !!currentLimit && !!currentPage,
  });

  return {
    dataUser,
    isLoadingUser,
    isRefetchingUser,
    refetchUser,

    selectedId,
    setSelectedId,

    defaultValue,
    setDefaultValue,

    name,
    setName,
  };
};

export default useUser;
