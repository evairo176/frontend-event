import DashboardLayout from "@/components/layouts/DashboardLayout";
import Event from "@/components/views/Admin/Event";
import React from "react";

type Props = {};

const AdminEventPage = (props: Props) => {
  return (
    <DashboardLayout
      type="admin"
      title="Event"
      description="List of all events, create new event and manage existing events"
    >
      <Event />
    </DashboardLayout>
  );
};

export default AdminEventPage;
