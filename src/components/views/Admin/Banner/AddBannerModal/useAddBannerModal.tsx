import useMediaHandling from "@/hooks/useMediaHandling";
import bannerServices from "@/services/banner.service";
import { ICreateBackendBanner, ICreateFormBanner } from "@/types/Banner";
import { errorCallback, successCallback } from "@/utils/tanstack-callback";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Please input name of banner"),
  isShow: yup.string().required("Please input description"),
  image: yup.mixed<FileList | string>().required("Please input icon"),
});

const useAddBannerModal = () => {
  const {
    control,
    handleSubmit: handleSubmitBannerForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const preview = watch("image");
  const fileUrl = getValues("image");

  const handleUploadIcon = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("image", fileUrl);
      }
    });
    // You may want to handle the files?.length !== 0 logic here if needed
  };

  const handleDeleteIcon = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = getValues("image");
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

  const addBanner = async (payload: ICreateBackendBanner) => {
    const res = await bannerServices.addBanner(payload);

    return res;
  };

  const {
    mutate: mutateAddBanner,
    isPending: isPendingMutateAddBanner,
    isSuccess: isSuccessMutateAddBanner,
  } = useMutation({
    mutationFn: addBanner,
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

  const handleAddBanner = async (data: ICreateFormBanner) => {
    const payload = {
      ...data,
      title: String(data.title),
      isShow: data.isShow === "true" ? true : false,
      image: String(data.image),
    };
    mutateAddBanner(payload);
  };

  return {
    control,
    errors,
    handleSubmitBannerForm,
    handleAddBanner,
    isPendingMutateAddBanner,
    isSuccessMutateAddBanner,
    handleUploadIcon,
    handleDeleteIcon,
    handleOnClose,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    preview,
  };
};

export default useAddBannerModal;
