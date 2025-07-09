import { DELAY } from "@/components/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import { DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name of event"),
  categoryId: yup.string().required("Please select category"),
  startDate: yup.mixed<DateValue>().required("Please select start date"),
  endDate: yup.mixed<DateValue>().required("Please select end date"),
  description: yup.string().required("Please input description"),
  isPublished: yup.string().required("Please select status"),
  isFeatured: yup.string().required("Please select featured"),
  isOnline: yup.string().required("Please select online or offline"),
  regionId: yup.string().required("Please select regionId"),
  latitude: yup.string().required("Please select latitude coordinate"),
  longitude: yup.string().required("Please select longitude coordinate"),
  address: yup.string().required("Please input address"),
});
const useInfoTab = () => {
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
    control: controlUpdateInfo,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: errorsUpdateInfo },
    reset: resetUpdateInfo,
    setValue: setValueUpdateInfo,
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
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,

    dataCategory,
    isLoadingCategory,

    dataRegionId,
    isLoadingRegionId,
    handleSearchRegionId,
  };
};

export default useInfoTab;
