import AuthLayout from "@/components/layouts/AuthLayout";
import RegisterSuccess from "@/components/views/Auth/RegisterSuccess";
import React from "react";

type Props = {};

const RegisterSuccessPage = (props: Props) => {
  return (
    <AuthLayout title="Events | Register Success">
      <RegisterSuccess />
    </AuthLayout>
  );
};

export default RegisterSuccessPage;
