import authServices from "@/services/auth";
import { IRegister } from "@/types/Auth";
import { errorCallback, successCallback } from "@/utils/tanstack-callback";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const registerSchema = yup.object().shape({
  fullname: yup.string().required("Fullname is required").max(100),
  username: yup.string().required("Username is required").max(50),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required").min(8).max(50),
  confirmPassword: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Passwords must match")
    .max(50),
});

const useRegister = () => {
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
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerService = async (body: IRegister) => {
    const result = await authServices.register(body);
    return result;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onError: (error: any) => {
      let message = errorCallback(error);

      addToast({
        title: "Failed",
        description: message,
        color: "danger",
        variant: "flat",
      });

      setError("root", {
        message: message,
      });
    },
    onSuccess: (response) => {
      // console.log(response);
      const message = successCallback(response);
      addToast({
        title: "Success",
        description: message,
        color: "success",
        variant: "flat",
      });
      router.push("/auth/register/success");
      reset();
    },
  });

  const handleRegister = (data: IRegister) => {
    // console.log("Register form data:", data);
    mutateRegister(data);
  };

  return {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  };
};

export default useRegister;
