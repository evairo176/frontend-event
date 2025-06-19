import { useState } from "react";

const useRegister = () => {
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    passwordConfirmation: false,
  });

  const handleVisiblePassword = (
    field: "password" | "passwordConfirmation",
  ) => {
    setVisiblePassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return {
    visiblePassword,
    handleVisiblePassword,
  };
};

export default useRegister;
