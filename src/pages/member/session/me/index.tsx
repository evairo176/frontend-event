import DashboardLayout from "@/components/layouts/DashboardLayout";
import MeSession from "@/components/views/Member/Session/MeSession";
import React from "react";

type Props = {};

const sessionMemberPage = (props: Props) => {
  return (
    <DashboardLayout
      type="member"
      title="Me session"
      description="configuration self session"
    >
      <MeSession />
    </DashboardLayout>
  );
};

export default sessionMemberPage;
