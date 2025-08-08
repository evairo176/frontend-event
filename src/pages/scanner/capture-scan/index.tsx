import DashboardLayout from "@/components/layouts/DashboardLayout";
import CaptureScan from "@/components/views/Scanner/CaptureScan";

import React from "react";

type Props = {};

const ScannerCaptureScanPage = (props: Props) => {
  return (
    <DashboardLayout
      type="company_scanner"
      title="Capture Scan"
      description="Capture scan "
    >
      <CaptureScan />
    </DashboardLayout>
  );
};

export default ScannerCaptureScanPage;
