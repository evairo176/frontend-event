import categoryServices from "@/services/category.service";
import mediaServices from "@/services/media.service";
import { ICategory, ICategoryForm } from "@/types/Category";
import { errorCallback, successCallback } from "@/utils/tanstack-callback";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name of category"),
  description: yup.string().required("Please input description"),
  icon: yup.mixed<FileList>().required("Please input icon"),
});

type UseAddCategoryModalProps = {};

const useAddCategoryModal = () => {
  const {
    control,
    handleSubmit: handleSubmitCategoryForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const uploadIcon = async (data: ICategoryForm) => {
    const formData = new FormData();

    formData.append("file", data.icon[0]);

    const { data: dataResponse } = await mediaServices.uploadFile(formData);

    return {
      name: data.name,
      description: data.description,
      icon: dataResponse?.data?.secure_url,
    };
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

  const { mutate: mutateAddFile, isPending: isPendingMutateAddFile } =
    useMutation({
      mutationFn: uploadIcon,
      onError: (error: any) => {
        let { message } = errorCallback(error);

        addToast({
          title: "Failed",
          description: message,
          color: "danger",
          variant: "flat",
        });
      },
      onSuccess: (response) => {
        console.log({ ddd: response });
        mutateAddCategory(response);
      },
    });

  const handleAddCategory = async (data: ICategoryForm) => {
    mutateAddFile(data);
  };

  return {
    control,
    errors,
    handleSubmitCategoryForm,
    handleAddCategory,
    isPendingMutateAddCategory,
    isSuccessMutateAddCategory,
    isPendingMutateAddFile,
  };
};

export default useAddCategoryModal;
