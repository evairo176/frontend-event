import DashboardLayout from "@/components/layouts/DashboardLayout";
import Mfa from "@/components/views/Company/Setting/Mfa";
import React from "react";

type Props = {};

const MfaCompanyPage = (props: Props) => {
  return (
    <DashboardLayout type="company_owner" title="MFA" description="Mfa company">
      <Mfa />
    </DashboardLayout>
  );
};

export default MfaCompanyPage;
