import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailEvent from "@/components/views/Admin/Event/DetailEvent";

import React from "react";

type Props = {};

const AdminEventDetailPage = (props: Props) => {
  return (
    <DashboardLayout
      type="admin"
      title="Detail Event"
      description="Manage information for this event"
    >
      <DetailEvent />
    </DashboardLayout>
  );
};

export default AdminEventDetailPage;
