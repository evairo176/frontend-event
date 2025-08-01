import authServices from "@/services/auth.service";
import { IRegister, IResetPassword } from "@/types/Auth";
import { errorCallback, successCallback } from "@/utils/tanstack-callback";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// Regex untuk minimal 1 huruf kapital
const capitalLetterRegex = /[A-Z]/;

const registerSchema = yup.object().shape({
  verificationCode: yup.string().required(),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(50)
    .matches(
      capitalLetterRegex,
      "Password harus mengandung minimal 1 huruf kapital",
    ),
  confirmPassword: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Passwords must match")
    .test(
      "has-capital",
      "Password harus mengandung minimal 1 huruf kapital",
      function (value) {
        return capitalLetterRegex.test(value || "");
      },
    )
    .max(50),
});

const useResetPassword = () => {
  const router = useRouter();
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleVisiblePassword = (field: "password" | "confirmPassword") => {
    setVisiblePassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    setValue,
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      verificationCode: "",
    },
  });

  const resetPasswordService = async (body: IResetPassword) => {
    const result = await authServices.resetPassword(body);
    return result;
  };

  const {
    mutate: mutateResetPassword,
    isPending: isPendingResetPassword,
    isSuccess: isSuccessResetPassword,
  } = useMutation({
    mutationFn: resetPasswordService,
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

      router.replace("/");
      addToast({
        title: "Success",
        description: message,
        color: "success",
        variant: "flat",
      });
      reset();
    },
  });

  const handleResetPassword = (data: IResetPassword) => {
    // console.log("Register form data:", data);
    mutateResetPassword(data);
  };

  return {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleResetPassword,
    isPendingResetPassword,
    isSuccessResetPassword,
    errors,
    setValue,
    reset,
  };
};

export default useResetPassword;
