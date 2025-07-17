import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Admin/Dashbord";
import React from "react";

type Props = {};

const AdminBlogCategoryPage = (props: Props) => {
  return (
    <DashboardLayout
      type="admin"
      title="Blog Category"
      description="Blog Category admin"
    >
      <Dashboard />
    </DashboardLayout>
  );
};

export default AdminBlogCategoryPage;
