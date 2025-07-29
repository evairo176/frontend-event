import DashboardLayout from "@/components/layouts/DashboardLayout";

import React from "react";

type Props = {};

const AdminBlogPage = (props: Props) => {
  return (
    <DashboardLayout type="admin" title="Blog" description="Blog admin">
      Blog
    </DashboardLayout>
  );
};

export default AdminBlogPage;
