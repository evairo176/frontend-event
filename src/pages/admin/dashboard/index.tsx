import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Admin/Dashboard";

import React from "react";

type Props = {};

const AdminDashboardPage = (props: Props) => {
  return (
    <DashboardLayout
      type="admin"
      title="Dashboard"
      description="Dashboard admin"
    >
      <Dashboard />
    </DashboardLayout>
  );
};

export default AdminDashboardPage;
