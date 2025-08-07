import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransaction from "@/components/views/Company/Transaction/DetailTransaction";

import React from "react";

type Props = {};

const MemberDetailTransactionPage = (props: Props) => {
  return (
    <DashboardLayout
      type="company_owner"
      title="Detail Transaction"
      description="Information about transaction"
    >
      <DetailTransaction />
    </DashboardLayout>
  );
};

export default MemberDetailTransactionPage;
