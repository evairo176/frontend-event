import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Admin/Dashbord";
import React from "react";

type Props = {};

const AdminBlogPage = (props: Props) => {
  return (
    <DashboardLayout type="admin" title="Blog" description="Blog admin">
      <Dashboard />
    </DashboardLayout>
  );
};

export default AdminBlogPage;
