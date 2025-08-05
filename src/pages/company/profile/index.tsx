import DashboardLayout from "@/components/layouts/DashboardLayout";
import Profile from "@/components/views/Company/Profile";
import React from "react";

type Props = {};

const MemberProfilePage = (props: Props) => {
  return (
    <DashboardLayout
      type="company"
      title="Profile"
      description="Profile company"
    >
      <Profile />
    </DashboardLayout>
  );
};

export default MemberProfilePage;
