import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Member/Dashboard";

import React from "react";

type Props = {};

const MemberDashboardPage = (props: Props) => {
  return (
    <DashboardLayout
      type="member"
      title="Dashboard"
      description="Dashboard member"
    >
      <Dashboard />
    </DashboardLayout>
  );
};

export default MemberDashboardPage;
