import DashboardLayout from "@/components/layouts/DashboardLayout";
import Mfa from "@/components/views/Admin/Mfa";
import React from "react";

type Props = {};

const MfaAdminPage = (props: Props) => {
  return (
    <DashboardLayout type="admin" title="MFA" description="Mfa admin">
      <Mfa />
    </DashboardLayout>
  );
};

export default MfaAdminPage;
