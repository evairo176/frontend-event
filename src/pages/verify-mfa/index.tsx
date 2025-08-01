import AuthLayout from "@/components/layouts/AuthLayout";
import VerifyMfa from "@/components/views/Auth/VerifyMfa";
import React from "react";

type Props = {};

const VerifyMfaPage = (props: Props) => {
  return (
    <AuthLayout title="Events | Verify MFA">
      <VerifyMfa />
    </AuthLayout>
  );
};

export default VerifyMfaPage;
