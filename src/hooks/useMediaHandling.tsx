import mediaServices from "@/services/media.service";
import { errorCallback } from "@/utils/tanstack-callback";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useMediaHandling = () => {
  const uploadFile = async (
    file: File,
    callback: (fileUrl: string) => void,
  ) => {
    const formData = new FormData();

    formData.append("file", file);
    file;
    const { data: dataResponse } = await mediaServices.uploadFile(formData);

    callback(dataResponse?.data?.secure_url);
  };

  const { mutate: mutateUploadFile, isPending: isPendingMutateUploadFile } =
    useMutation({
      mutationFn: (variables: {
        file: File;
        callback: (fileUrl: string) => void;
      }) => uploadFile(variables.file, variables.callback),
      onError: (error: any) => {
        let { message } = errorCallback(error);

        addToast({
          title: "Failed",
          description: message,
          color: "danger",
          variant: "flat",
        });
      },
    });

  const deleteFile = async (fileUrl: string, callback: () => void) => {
    const res = await mediaServices.deleteFile({ fileUrl });
    console.log(res);
    if (res.data.message === "Success remove file") {
      callback();
    }
  };

  const { mutate: mutateDeleteFile, isPending: isPendingMutateDeleteFile } =
    useMutation({
      mutationFn: (variables: { fileUrl: string; callback: () => void }) =>
        deleteFile(variables.fileUrl, variables.callback),
      onError: (error: any) => {
        let { message } = errorCallback(error);

        addToast({
          title: "Failed",
          description: message,
          color: "danger",
          variant: "flat",
        });
      },
    });

  const handleUploadFile = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
    callback: (fileUrl?: string) => void,
  ) => {
    if (files?.length !== 0) {
      onChange(files);
      mutateUploadFile({
        file: files[0],
        callback,
      });
    }
  };

  const handleDeleteFile = (
    callback: () => void,
    fileUrl?: string | FileList | undefined,
  ) => {
    if (typeof fileUrl === "string") {
      mutateDeleteFile({ fileUrl, callback });
    } else {
      callback();
    }
  };

  return {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    isPendingMutateDeleteFile,
    handleUploadFile,
    handleDeleteFile,
  };
};

export default useMediaHandling;
