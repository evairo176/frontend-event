import { DELAY } from "@/components/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  isOnline: yup.string().required("Please select online or offline"),
  regionId: yup.string().required("Please select regionId"),
  latitude: yup.string().required("Please select latitude coordinate"),
  longitude: yup.string().required("Please select longitude coordinate"),
  address: yup.string().required("Please input address"),
});
const useLocationTab = () => {
  const debounce = useDebounce();

  const {
    data: dataCategory,
    isLoading: isLoadingCategory,
    // isRefetching: isRefetchingCategory,
    // refetch: refetchCategory,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryServices.getCategories(),
  });

  const {
    control: controlUpdateLocation,
    handleSubmit: handleSubmitUpdateLocation,
    formState: { errors: errorsUpdateLocation },
    reset: resetUpdateLocation,
    setValue: setValueUpdateLocation,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [searchRegency, setSearchRegency] = useState("");

  const handleSearchRegionId = (regionid: string) => {
    debounce(() => {
      setSearchRegency(regionid);
    }, DELAY);
  };

  const {
    data: dataRegionId,
    isLoading: isLoadingRegionId,
    // isRefetching: isRefetchingCategory,
    // refetch: refetchCategory,
  } = useQuery({
    queryKey: ["region", searchRegency],
    queryFn: () => eventServices.searchLocationByRegency(`${searchRegency}`),
  });

  return {
    controlUpdateLocation,
    errorsUpdateLocation,
    handleSubmitUpdateLocation,
    resetUpdateLocation,
    setValueUpdateLocation,

    dataCategory,
    isLoadingCategory,

    dataRegionId,
    isLoadingRegionId,
    handleSearchRegionId,
  };
};

export default useLocationTab;
