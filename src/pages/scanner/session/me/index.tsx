import DashboardLayout from "@/components/layouts/DashboardLayout";
import MeSession from "@/components/views/Scanner/Session/MeSession";
import React from "react";

type Props = {};

const sessionScannerPage = (props: Props) => {
  return (
    <DashboardLayout
      type="company_scanner"
      title="Me session"
      description="configuration self session"
    >
      <MeSession />
    </DashboardLayout>
  );
};

export default sessionScannerPage;
