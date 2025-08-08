import DashboardLayout from "@/components/layouts/DashboardLayout";
import Mfa from "@/components/views/Scanner/Setting/Mfa";
import React from "react";

type Props = {};

const MfaScannerPage = (props: Props) => {
  return (
    <DashboardLayout
      type="company_scanner"
      title="MFA"
      description="Mfa scanner"
    >
      <Mfa />
    </DashboardLayout>
  );
};

export default MfaScannerPage;
