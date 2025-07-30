import { DELAY } from "@/components/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
// Regex untuk minimal 1 huruf kapital
const capitalLetterRegex = /[A-Z]/;
const schema = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Current password is required")
    .min(8, "Current Password must be at least 8 characters")
    .max(50)
    .matches(
      capitalLetterRegex,
      "Current Password harus mengandung minimal 1 huruf kapital",
    ),
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
const useChangePasswordTab = () => {
  const [visiblePassword, setVisiblePassword] = useState({
    oldPassword: false,
    password: false,
    confirmPassword: false,
  });

  const handleVisiblePassword = (
    field: "password" | "confirmPassword" | "oldPassword",
  ) => {
    setVisiblePassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  const {
    control: controlUpdatePassword,
    handleSubmit: handleSubmitUpdatePassword,
    formState: { errors: errorsUpdatePassword },
    reset: resetUpdatePassword,
    setValue: setValueUpdatePassword,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  return {
    controlUpdatePassword,
    errorsUpdatePassword,
    handleSubmitUpdatePassword,
    resetUpdatePassword,
    setValueUpdatePassword,

    visiblePassword,
    handleVisiblePassword,
  };
};

export default useChangePasswordTab;
