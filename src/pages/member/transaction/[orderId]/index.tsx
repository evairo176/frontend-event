import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransaction from "@/components/views/Member/Transaction/DetailTransaction";

import React from "react";

type Props = {};

const MemberDetailTransactionPage = (props: Props) => {
  return (
    <DashboardLayout
      type="member"
      title="Detail Transaction"
      description="Information about transaction"
    >
      <DetailTransaction />
    </DashboardLayout>
  );
};

export default MemberDetailTransactionPage;
