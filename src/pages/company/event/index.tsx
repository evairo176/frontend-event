import DashboardLayout from "@/components/layouts/DashboardLayout";
import Event from "@/components/views/Company/Event";
import React from "react";

type Props = {};

const CompanyEventPage = (props: Props) => {
  return (
    <DashboardLayout
      type="company_owner"
      title="Event"
      description="List of all events, create new event and manage existing events"
    >
      <Event />
    </DashboardLayout>
  );
};

export default CompanyEventPage;
