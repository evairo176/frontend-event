import DashboardLayout from "@/components/layouts/DashboardLayout";
import Transaction from "@/components/views/Member/Transaction";

import React from "react";

type Props = {};

const MemberTransactionPage = (props: Props) => {
  return (
    <DashboardLayout
      type="member"
      title="Transaction"
      description="Transaction member"
    >
      <Transaction />
    </DashboardLayout>
  );
};

export default MemberTransactionPage;
