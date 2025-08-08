import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Scanner/Dashboard";

import React from "react";

type Props = {};

const ScannerDashboardPage = (props: Props) => {
  return (
    <DashboardLayout
      type="company_scanner"
      title="Dashboard"
      description="Dashboard scanner"
    >
      <Dashboard />
    </DashboardLayout>
  );
};

export default ScannerDashboardPage;
