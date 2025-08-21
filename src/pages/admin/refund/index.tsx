import DashboardLayout from "@/components/layouts/DashboardLayout";
import Refund from "@/components/views/Admin/Refund";
import React from "react";

type Props = {};

const AdminRefundPage = (props: Props) => {
  return (
    <DashboardLayout
      type="admin"
      title="Refund"
      description="List of all refund, manage existing refund"
    >
      <Refund />
    </DashboardLayout>
  );
};

export default AdminRefundPage;
