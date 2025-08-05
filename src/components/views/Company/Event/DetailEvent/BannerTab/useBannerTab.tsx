import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateBanner = yup.object().shape({
  banner: yup.mixed<FileList | string>().required("Please input banner"),
});

const useBannerTab = () => {
  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const {
    control: controlUpdateBanner,
    handleSubmit: handleSubmitUpdateBanner,
    formState: { errors: errorsUpdateBanner },
    reset: resetUpdateBanner,
    watch: watchUpdateBanner,
    getValues: getValuesUpdateBanner,
    setValue: setValueUpdateBanner,
  } = useForm({
    resolver: yupResolver(schemaUpdateBanner),
  });
  const preview = watchUpdateBanner("banner");
  const fileUrl = getValuesUpdateBanner("banner");

  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValueUpdateBanner("banner", fileUrl);
      }
    });
    // You may want to handle the files?.length !== 0 logic here if needed
  };

  const handleDeleteBanner = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(() => onChange(undefined), fileUrl);
  };

  return {
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    handleDeleteBanner,
    handleUploadBanner,
    preview,
    controlUpdateBanner,
    handleSubmitUpdateBanner,
    errorsUpdateBanner,
    resetUpdateBanner,
  };
};

export default useBannerTab;
