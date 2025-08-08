import DashboardLayout from "@/components/layouts/DashboardLayout";
import Profile from "@/components/views/Scanner/Profile";
import React from "react";

type Props = {};

const ScannerProfilePage = (props: Props) => {
  return (
    <DashboardLayout
      type="company_scanner"
      title="Profile"
      description="Profile scanner"
    >
      <Profile />
    </DashboardLayout>
  );
};

export default ScannerProfilePage;
