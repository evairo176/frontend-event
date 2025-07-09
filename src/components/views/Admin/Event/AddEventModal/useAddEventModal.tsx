import { DELAY } from "@/components/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import { IEvent, IEventForm } from "@/types/Event";
import { toDateStandard } from "@/utils/date";

import { errorCallback, successCallback } from "@/utils/tanstack-callback";
import { addToast, DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { getLocalTimeZone, now } from "@internationalized/date";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name of event"),
  categoryId: yup.string().required("Please select category"),
  startDate: yup.mixed<DateValue>().required("Please select start date"),
  endDate: yup.mixed<DateValue>().required("Please select end date"),
  banner: yup.mixed<FileList | string>().required("Please input icon"),
  description: yup.string().required("Please input description"),
  isPublished: yup.string().required("Please select status"),
  isFeatured: yup.string().required("Please select featured"),
  isOnline: yup.string().required("Please select online or offline"),
  regionId: yup.string().required("Please select regionId"),
  latitude: yup.string().required("Please select latitude coordinate"),
  longitude: yup.string().required("Please select longitude coordinate"),
  address: yup.string().required("Please input address"),
});

const useAddEventModal = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit: handleSubmitEventForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      startDate: now(getLocalTimeZone()),
      endDate: now(getLocalTimeZone()),
    },
  });
  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleDeleteFile,
    handleUploadFile,
  } = useMediaHandling();
  const debounce = useDebounce();

  const preview = watch("banner");
  const fileUrl = getValues("banner");

  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("banner", fileUrl);
      }
    });
    // You may want to handle the files?.length !== 0 logic here if needed
  };

  const handleDeleteBanner = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = getValues("banner");
    handleDeleteFile(() => onChange(undefined), fileUrl);
  };

  const handleOnClose = (onClose: () => void) => {
    if (typeof fileUrl === "string") {
      handleDeleteFile(() => {
        reset();
        onClose();
      }, fileUrl);
    } else {
      reset();
      onClose();
    }
  };

  const addEvent = async (payload: IEventForm) => {
    const res = await eventServices.addEvent(payload);
    return res;
  };

  const {
    mutate: mutateAddEvent,
    isPending: isPendingMutateAddEvent,
    isSuccess: isSuccessMutateAddEvent,
  } = useMutation({
    mutationFn: addEvent,
    onSuccess: (response) => {
      const message = successCallback(response);

      addToast({
        title: "Success",
        description: message,
        color: "success",
        variant: "flat",
      });
    },
    onError: (error: any) => {
      const { message } = errorCallback(error);

      addToast({
        title: "Failed",
        description: message,
        color: "danger",
        variant: "flat",
      });
    },
  });

  const handleAddEvent = async (data: IEvent) => {
    const payload = {
      ...data,
      isFeatured: Boolean(data.isFeatured),
      isPublished: Boolean(data.isPublished),
      isOnline: Boolean(data.isOnline),
      regionId: String(data.regionId),
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      startDate: toDateStandard(data.startDate),
      endDate: toDateStandard(data.endDate),
      address: String(data.address),
    };
    mutateAddEvent(payload);
  };

  const {
    data: dataCategory,
    isLoading: isLoadingCategory,
    // isRefetching: isRefetchingCategory,
    // refetch: refetchCategory,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryServices.getCategories(),
    enabled: router.isReady,
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
    enabled: router.isReady && searchRegency !== "",
  });

  return {
    control,
    errors,
    handleSubmitEventForm,
    handleAddEvent,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,
    handleUploadBanner,
    handleDeleteBanner,
    handleOnClose,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    preview,

    dataCategory,
    isLoadingCategory,

    dataRegionId,
    isLoadingRegionId,
    handleSearchRegionId,
  };
};

export default useAddEventModal;
