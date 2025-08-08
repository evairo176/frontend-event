import { Button } from "@heroui/react";
import React, { useEffect } from "react";
import useRevokeMfa from "./useRevokeMfa";
import { Loader } from "lucide-react";

type Props = {
  refetchProfile: () => void;
};
const RevokeMfa = ({ refetchProfile }: Props) => {
  const { handleMfaRevoke, isPendingMfaRevoke, isSuccessMfaRevoke } =
    useRevokeMfa();

  useEffect(() => {
    if (isSuccessMfaRevoke) {
      refetchProfile();
    }
  }, [isSuccessMfaRevoke]);

  return (
    <Button
      disabled={isPendingMfaRevoke}
      className="mr-1 h-[35px] !bg-red-100 !text-[#c40006d3] shadow-none"
      onPress={handleMfaRevoke}
    >
      {isPendingMfaRevoke && <Loader className="animate-spin" />}
      Revoke Access
    </Button>
  );
};

export default RevokeMfa;
