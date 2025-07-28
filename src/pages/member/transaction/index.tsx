import DashboardLayout from "@/components/layouts/DashboardLayout";
import MemberTransaction from "@/components/views/Member/MemberTransaction";

import React from "react";

type Props = {};

const MemberTransactionPage = (props: Props) => {
  return (
    <DashboardLayout
      type="member"
      title="Transaction"
      description="Transaction member"
    >
      <MemberTransaction />
    </DashboardLayout>
  );
};

export default MemberTransactionPage;
