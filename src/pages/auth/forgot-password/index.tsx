import AuthLayout from "@/components/layouts/AuthLayout";
import ForgotPassword from "@/components/views/Auth/ForgotPassword";
import React from "react";

type Props = {};

const ForgotPasswordPage = (props: Props) => {
  return (
    <AuthLayout title="Events | Forgot password">
      <ForgotPassword />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
