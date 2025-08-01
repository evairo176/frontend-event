import DashboardLayout from "@/components/layouts/DashboardLayout";
import Mfa from "@/components/views/Admin/Setting/Mfa";
import React from "react";

type Props = {};

const MfaAdminPage = (props: Props) => {
  return (
    <DashboardLayout type="member" title="MFA" description="Mfa member">
      <Mfa />
    </DashboardLayout>
  );
};

export default MfaAdminPage;
