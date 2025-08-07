import DashboardLayout from "@/components/layouts/DashboardLayout";
import Transaction from "@/components/views/Company/Transaction";
import React from "react";

type Props = {};

const CompanyTransactionPage = (props: Props) => {
  return (
    <DashboardLayout
      type="company_owner"
      title="Transaction"
      description="Company transaction"
    >
      <Transaction />
    </DashboardLayout>
  );
};

export default CompanyTransactionPage;
