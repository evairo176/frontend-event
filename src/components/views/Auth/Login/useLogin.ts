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
});
const useLogin = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

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
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const loginService = async (body: ILogin) => {
    const result = await signIn("credentials", {
      ...body,
      redirect: false,
      callbackUrl,
    });

    if (result?.error && result.status === 401) {
      throw new Error("Email or username not match with your password");
    }
    return result;
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError: (error: any) => {
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
    onSuccess: async (response) => {
      const session = (await getSession()) as ISessionExtended | null;
      // const message = response?.message;
      const role = session?.user?.role;

      if (session && role) {
        addToast({
          title: "Success",
          description: "Login Successfully",
          color: "success",
          variant: "flat",
        });

        router.push(callbackUrl);
        // if (role === "admin") {
        //   router.push("/admin");
        // }
        // if (role === "member") {
        //   router.push("/member");
        // }
      }

      reset();
    },
  });

  const handleLogin = (data: ILogin) => {
    // console.log("login form data:", data);
    mutateLogin(data);
  };

  return {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  };
};

export default useLogin;
