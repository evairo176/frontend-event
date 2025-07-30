import DashboardLayout from "@/components/layouts/DashboardLayout";
import Profile from "@/components/views/Member/Profile";
import React from "react";

type Props = {};

const MemberProfilePage = (props: Props) => {
  return (
    <DashboardLayout type="member" title="Profile" description="Profile member">
      <Profile />
    </DashboardLayout>
  );
};

export default MemberProfilePage;
