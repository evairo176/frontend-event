import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailCategory from "@/components/views/Admin/DetailCategory";
import React from "react";

type Props = {};

const AdminCategoryDetailPage = (props: Props) => {
  return (
    <DashboardLayout
      type="admin"
      title="Detail Category"
      description="Manage information for this category"
    >
      <DetailCategory />
    </DashboardLayout>
  );
};

export default AdminCategoryDetailPage;
