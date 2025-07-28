import AuthLayout from "@/components/layouts/AuthLayout";
import PaymentSuccess from "@/components/views/Payment/PaymentSuccess";
import React from "react";

type Props = {};

const PaymentSuccessPage = (props: Props) => {
  return (
    <AuthLayout title="Events | Payment Success">
      <PaymentSuccess />
    </AuthLayout>
  );
};

export default PaymentSuccessPage;
