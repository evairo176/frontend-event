import DashboardLayout from "@/components/layouts/DashboardLayout";
import Banner from "@/components/views/Admin/Banner/Banner";
import React from "react";

type Props = {};

const AdminBannerPage = (props: Props) => {
  return (
    <DashboardLayout
      type="admin"
      title="Banner"
      description="List of all banner, create new banner and manage existing banner"
    >
      <Banner />
    </DashboardLayout>
  );
};

export default AdminBannerPage;
