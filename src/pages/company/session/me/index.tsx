import DashboardLayout from "@/components/layouts/DashboardLayout";
import MeSession from "@/components/views/Company/Session/MeSession";
import React from "react";

type Props = {};

const sessionCompanyPage = (props: Props) => {
  return (
    <DashboardLayout
      type="company_owner"
      title="Me session"
      description="configuration self session"
    >
      <MeSession />
    </DashboardLayout>
  );
};

export default sessionCompanyPage;
