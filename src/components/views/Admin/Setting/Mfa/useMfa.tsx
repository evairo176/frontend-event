import mfaServices from "@/services/mfa.service";
import { IVerificationOTP } from "@/types/Auth";
import { errorCallback, successCallback } from "@/utils/tanstack-callback";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
const verifyMfaSchema = yup.object().shape({
  code: yup.string().required().max(6),
  secretKey: yup.string().trim().required(),
});
const useMfa = () => {
  const { isReady } = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    setValue,
  } = useForm({
    resolver: yupResolver(verifyMfaSchema),
    defaultValues: {
      code: "",
      secretKey: "",
    },
  });

  const VerifyMfaService = async (body: IVerificationOTP) => {
    const result = await mfaServices.verifyMfa(body);
    return result;
  };

  const {
    mutate: mutateVerifyMfa,
    isPending: isPendingVerifyMfa,
    isSuccess: isSuccessVerifyMfa,
  } = useMutation({
    mutationFn: VerifyMfaService,
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

      //   router.replace("/");
      addToast({
        title: "Success",
        description: message,
        color: "success",
        variant: "flat",
      });
      reset();
    },
  });

  const handleVerifyMfa = (data: IVerificationOTP) => {
    // console.log("Register form data:", data);
    mutateVerifyMfa(data);
  };

  const getMfaSetup = async () => {
    const { data } = await mfaServices.mfaSetup();

    return data;
  };

  const {
    data: dataMfaSetup,
    refetch: refetchMfaSetup,
    isLoading: isLoadingMfaSetup,
  } = useQuery({
    queryKey: ["mfa-setup"],
    queryFn: getMfaSetup,
    enabled: isReady,
    staleTime: Infinity,
  });
  return {
    dataMfaSetup,
    refetchMfaSetup,
    isLoadingMfaSetup,
    control,
    handleSubmit,
    handleVerifyMfa,
    isPendingVerifyMfa,
    isSuccessVerifyMfa,
    errors,
    setValue,
    reset,
  };
};

export default useMfa;
