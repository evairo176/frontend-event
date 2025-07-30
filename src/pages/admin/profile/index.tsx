import DashboardLayout from "@/components/layouts/DashboardLayout";
import Profile from "@/components/views/Admin/Profile";
import React from "react";

type Props = {};

const MemberProfilePage = (props: Props) => {
  return (
    <DashboardLayout type="admin" title="Profile" description="Profile admin">
      <Profile />
    </DashboardLayout>
  );
};

export default MemberProfilePage;
