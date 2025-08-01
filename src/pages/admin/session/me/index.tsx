import DashboardLayout from "@/components/layouts/DashboardLayout";
import MeSession from "@/components/views/Admin/Session/MeSession";
import React from "react";

type Props = {};

const sessionAdminPage = (props: Props) => {
  return (
    <DashboardLayout
      type="admin"
      title="Me session"
      description="configuration self session"
    >
      <MeSession />
    </DashboardLayout>
  );
};

export default sessionAdminPage;
