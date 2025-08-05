import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Company/Dashboard";

import React from "react";

type Props = {};

const CompanyDashboardPage = (props: Props) => {
  return (
    <DashboardLayout
      type="company"
      title="Dashboard"
      description="Dashboard company"
    >
      <Dashboard />
    </DashboardLayout>
  );
};

export default CompanyDashboardPage;
