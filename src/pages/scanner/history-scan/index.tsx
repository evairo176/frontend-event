import DashboardLayout from "@/components/layouts/DashboardLayout";
import HistoryScan from "@/components/views/Scanner/HistoryScan";

import React from "react";

type Props = {};

const ScannerHistoryScanPage = (props: Props) => {
  return (
    <DashboardLayout
      type="company_scanner"
      title="Capture Scan"
      description="Capture scan "
    >
      <HistoryScan />
    </DashboardLayout>
  );
};

export default ScannerHistoryScanPage;
