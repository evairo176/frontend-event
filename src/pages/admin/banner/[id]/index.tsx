import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailBanner from "@/components/views/Admin/Banner/DetailBanner";
import React from "react";

type Props = {};

const AdminBannerDetailPage = (props: Props) => {
  return (
    <DashboardLayout
      type="admin"
      title="Detail Banner"
      description="Manage information for this banner"
    >
      <DetailBanner />
    </DashboardLayout>
  );
};

export default AdminBannerDetailPage;
