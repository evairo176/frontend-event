import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateImage = yup.object().shape({
  image: yup.mixed<FileList | string>().required("Please input image"),
});

const useImageTab = () => {
  const {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const {
    control: controlUpdateImage,
    handleSubmit: handleSubmitUpdateImage,
    formState: { errors: errorsUpdateImage },
    reset: resetUpdateImage,
    watch: watchUpdateImage,
    getValues: getValuesUpdateImage,
    setValue: setValueUpdateImage,
  } = useForm({
    resolver: yupResolver(schemaUpdateImage),
  });
  const preview = watchUpdateImage("image");

  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (files?.length !== 0) {
      onChange(files);
      mutateUploadFile({
        file: files[0],
        callback: (fileUrl: string) => {
          setValueUpdateImage("image", fileUrl);
        },
      });
    }
  };

  const handleDeleteImage = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = getValuesUpdateImage("image");

    if (typeof fileUrl === "string") {
      mutateDeleteFile({ fileUrl, callback: () => onChange(undefined) });
    }
  };

  return {
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    handleDeleteImage,
    handleUploadImage,
    preview,
    controlUpdateImage,
    handleSubmitUpdateImage,
    errorsUpdateImage,
    resetUpdateImage,
  };
};

export default useImageTab;
