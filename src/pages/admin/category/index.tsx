import DashboardLayout from "@/components/layouts/DashboardLayout";
import Category from "@/components/views/Admin/Category";
import React from "react";

type Props = {};

const AdminCategoryPage = (props: Props) => {
  return (
    <DashboardLayout
      type="admin"
      title="Category"
      description="List of all category, create new category and manage existing category"
    >
      <Category />
    </DashboardLayout>
  );
};

export default AdminCategoryPage;
