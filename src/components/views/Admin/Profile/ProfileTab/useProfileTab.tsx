import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateProfile = yup.object().shape({
  profilePicture: yup
    .mixed<FileList | string>()
    .required("Please input profile"),
});

const useProfileTab = ({ fullname }: { fullname: string }) => {
  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const {
    control: controlUpdateProfile,
    handleSubmit: handleSubmitUpdateProfile,
    formState: { errors: errorsUpdateProfile },
    reset: resetUpdateProfile,
    watch: watchUpdateProfile,
    getValues: getValuesUpdateProfile,
    setValue: setValueUpdateProfile,
  } = useForm({
    resolver: yupResolver(schemaUpdateProfile),
  });
  const preview = watchUpdateProfile("profilePicture");
  const fileUrl = getValuesUpdateProfile("profilePicture");

  const handleUploadProfile = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValueUpdateProfile("profilePicture", fileUrl);
      }
    });
    // You may want to handle the files?.length !== 0 logic here if needed
  };

  const handleDeleteProfile = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(() => onChange(undefined), fileUrl);
  };

  return {
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    handleDeleteProfile,
    handleUploadProfile,
    preview,
    controlUpdateProfile,
    handleSubmitUpdateProfile,
    errorsUpdateProfile,
    resetUpdateProfile,
  };
};

export default useProfileTab;
