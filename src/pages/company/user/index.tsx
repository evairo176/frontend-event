import DashboardLayout from "@/components/layouts/DashboardLayout";
import User from "@/components/views/Company/User";

import React from "react";

type Props = {};

const userCompanyPage = (props: Props) => {
  return (
    <DashboardLayout
      type="company_owner"
      title="User"
      description="manage user"
    >
      <User />
    </DashboardLayout>
  );
};

export default userCompanyPage;
