import AuthLayout from "@/components/layouts/AuthLayout";
import ConfirmAccount from "@/components/views/Auth/ConfirmAccount";
import authServices from "@/services/auth.service";
import React from "react";

type Props = {
  status: "success" | "failed";
};

const ConfirmAccountPage = (props: Props) => {
  return (
    <AuthLayout title="Events | Confirm Account">
      <ConfirmAccount {...props} />
    </AuthLayout>
  );
};
export const getServerSideProps = async (context: {
  query: {
    code: string;
  };
}) => {
  try {
    await authServices.verificationEmail({
      code: context.query.code,
    });
    return {
      props: {
        status: "success",
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        status: "failed",
      },
    };
  }
};

export default ConfirmAccountPage;
