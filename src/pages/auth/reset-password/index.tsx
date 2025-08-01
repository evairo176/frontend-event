import AuthLayout from "@/components/layouts/AuthLayout";
import ResetPassword from "@/components/views/Auth/ResetPassword";
import React from "react";

type Props = {};

const ResetPasswordPage = (props: Props) => {
  return (
    <AuthLayout title="Events | Reset password">
      <ResetPassword />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
