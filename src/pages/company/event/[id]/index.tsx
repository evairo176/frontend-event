import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailEvent from "@/components/views/Company/Event/DetailEvent";

import React from "react";

type Props = {};

const CompanyEventDetailPage = (props: Props) => {
  return (
    <DashboardLayout
      type="company"
      title="Detail Event"
      description="Manage information for this event"
    >
      <DetailEvent />
    </DashboardLayout>
  );
};

export default CompanyEventDetailPage;
