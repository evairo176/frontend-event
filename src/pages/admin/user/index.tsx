import DashboardLayout from "@/components/layouts/DashboardLayout";
import User from "@/components/views/Admin/User";
import React from "react";

type Props = {};

const userAdminPage = (props: Props) => {
  return (
    <DashboardLayout type="admin" title="User" description="manage user">
      <User />
    </DashboardLayout>
  );
};

export default userAdminPage;
