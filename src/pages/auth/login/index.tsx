import AuthLayout from "@/components/layouts/AuthLayout";
import Login from "@/components/views/Auth/Login";
import React from "react";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <AuthLayout title="Events | Login">
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;
