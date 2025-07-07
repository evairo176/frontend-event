import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import { ICategory } from "@/types/Category";
import { errorCallback, successCallback } from "@/utils/tanstack-callback";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name of category"),
  description: yup.string().required("Please input description"),
  icon: yup.mixed<FileList | string>().required("Please input icon"),
});

const useAddCategoryModal = () => {
  const {
    control,
    handleSubmit: handleSubmitCategoryForm,
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

  const preview = watch("icon");
  const fileUrl = getValues("icon");

  const handleUploadIcon = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("icon", fileUrl);
      }
    });
    // You may want to handle the files?.length !== 0 logic here if needed
  };

  const handleDeleteIcon = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = getValues("icon");
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

  const addCategory = async (payload: ICategory) => {
    const res = await categoryServices.addCategory(payload);

    return res;
  };

  const {
    mutate: mutateAddCategory,
    isPending: isPendingMutateAddCategory,
    isSuccess: isSuccessMutateAddCategory,
  } = useMutation({
    mutationFn: addCategory,
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

  const handleAddCategory = async (data: ICategory) => {
    mutateAddCategory(data);
  };

  return {
    control,
    errors,
    handleSubmitCategoryForm,
    handleAddCategory,
    isPendingMutateAddCategory,
    isSuccessMutateAddCategory,
    handleUploadIcon,
    handleDeleteIcon,
    handleOnClose,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    preview,
  };
};

export default useAddCategoryModal;
