import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailRefund from "@/components/views/Admin/Refund/DetailRefund";
import React from "react";

type Props = {};

const AdminDetailRefundPage = (props: Props) => {
  return (
    <DashboardLayout
      type="admin"
      title="Refund"
      description="List of all refund, manage existing refund"
    >
      <DetailRefund />
    </DashboardLayout>
  );
};

export default AdminDetailRefundPage;
