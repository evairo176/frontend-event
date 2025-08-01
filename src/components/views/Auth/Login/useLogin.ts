import { ILogin, ISessionExtended } from "@/types/Auth";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useSearchParams } from "next/navigation";

const loginSchema = yup.object().shape({
  identifier: yup.string().required("Email or Username is required"),
  password: yup.string().required("Password is required"),
  code: yup.string().optional().max(6),
});
const useLogin = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [mfaRequired, setMfaRequired] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  // Next.js App Router (app directory) does not provide `query` on `useRouter`.
  // To get query params, use `useSearchParams` from 'next/navigation'.
  const searchParams = useSearchParams();
  const callbackUrl: string = searchParams.get("callbackUrl") || "/";

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    watch,
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
      code: "",
    },
  });

  const loginService = async (body: ILogin) => {
    const result = await signIn("credentials", {
      ...body,
      redirect: false,
      callbackUrl,
    });
    console.log({ dfef: result });
    if (result?.error && result.status === 401) {
      throw new Error("Email or username not match with your password");
    }

    return result;
  };

  const handleLoginService = async (body: ILogin) => {
    const res = await signIn("credentials", {
      redirect: false,
      ...body,
      callbackUrl,
    });

    if (res?.error === "mfaRequired" && !body?.code) {
      setMfaRequired(true); // show OTP input
      addToast({
        title: "Warning",
        description: "Input code otp authenticator",
        color: "warning",
        variant: "flat",
      });
    } else if (res?.ok) {
      router.push(callbackUrl);
      reset();
    } else {
      addToast({
        title: "Failed",
        description: res?.error,
        color: "danger",
        variant: "flat",
      });
    }
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError: (error: any) => {
      console.log(error);
      addToast({
        title: "Failed",
        description: error?.message,
        color: "danger",
        variant: "flat",
      });

      // setError("root", {
      //   message: error?.message,
      // });
    },
    onSuccess: async (response: any) => {},
  });

  // const handleLogin = (data: ILogin) => {
  //   // console.log("login form data:", data);
  //   mutateLogin(data);
  // };

  return {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    // handleLogin,
    isPendingLogin,
    errors,
    mfaRequired,
    handleLoginService,
    isSubmitting,
  };
};

export default useLogin;
