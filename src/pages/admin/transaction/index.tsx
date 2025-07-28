import DashboardLayout from "@/components/layouts/DashboardLayout";
import Transaction from "@/components/views/Admin/Transaction";
import React from "react";

type Props = {};

const AdminTransactionPage = (props: Props) => {
  return (
    <DashboardLayout
      type="admin"
      title="Transaction"
      description="Admin transaction"
    >
      <Transaction />
    </DashboardLayout>
  );
};

export default AdminTransactionPage;
