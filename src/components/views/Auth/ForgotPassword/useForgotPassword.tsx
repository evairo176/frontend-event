import authServices from "@/services/auth.service";
import { errorCallback, successCallback } from "@/utils/tanstack-callback";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().required("Email is required").email(),
});
const useForgotPassword = () => {
  const { query, pathname, push } = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    watch,
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const forgotPasswordService = async (body: { email: string }) => {
    const result = await authServices.forgotPassword(body);
    return result;
  };

  const {
    mutate: mutateForgotPassword,
    isPending: isPendingForgotPassword,
    isSuccess: isSuccessForgotPassword,
  } = useMutation({
    mutationFn: forgotPasswordService,
    onError: (error: any) => {
      let { message, error: errorDetails } = errorCallback(error);

      addToast({
        title: "Failed",
        description: message,
        color: "danger",
        variant: "flat",
      });

      setError("root", {
        message: errorDetails,
      });
    },
    onSuccess: (response) => {
      // console.log(response);
      const message = successCallback(response);

      push({
        pathname,
        query: {
          email: watch("email"),
        },
      });
      addToast({
        title: "Success",
        description: message,
        color: "success",
        variant: "flat",
      });

      reset();
    },
  });

  const handleForgotPassword = (data: { email: string }) => {
    // console.log("Register form data:", data);
    mutateForgotPassword(data);
  };
  return {
    handleForgotPassword,
    isPendingForgotPassword,
    reset,
    handleSubmit,
    control,
    errors,
    isSuccessForgotPassword,
  };
};

export default useForgotPassword;
