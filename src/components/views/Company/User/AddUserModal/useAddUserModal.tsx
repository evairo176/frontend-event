import useMediaHandling from "@/hooks/useMediaHandling";
import userServices from "@/services/user.service";
import { IAddUser } from "@/types/User";
import { errorCallback, successCallback } from "@/utils/tanstack-callback";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const addUserSchema = yup.object().shape({
  fullname: yup.string().required("Fullname is required").max(100),
  username: yup.string().required("Username is required").max(50),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

interface Props {
  callbackSuccess: () => void;
}

const useAddUserModal = ({ callbackSuccess }: Props) => {
  const {
    control,
    handleSubmit: handleSubmitUserForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addUserSchema),
  });

  const addUser = async (payload: IAddUser) => {
    const res = await userServices.addUser(payload);

    return res;
  };

  const {
    mutate: mutateAddUser,
    isPending: isPendingMutateAddUser,
    isSuccess: isSuccessMutateAddUser,
  } = useMutation({
    mutationFn: addUser,
    onSuccess: (response) => {
      const message = successCallback(response);

      addToast({
        title: "Success",
        description: message,
        color: "success",
        variant: "flat",
      });

      callbackSuccess();
      reset();
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

  const handleAddUser = async (data: IAddUser) => {
    const payload = {
      ...data,
    };
    mutateAddUser(payload);
  };

  return {
    control,
    errors,
    handleSubmitUserForm,
    handleAddUser,
    isPendingMutateAddUser,
    isSuccessMutateAddUser,
  };
};

export default useAddUserModal;
