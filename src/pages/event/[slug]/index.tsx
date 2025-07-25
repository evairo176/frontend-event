import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import DetailEvent from "@/components/views/Event/DetailEvent";
import React from "react";

type Props = {};

const DetailEventPage = (props: Props) => {
  return (
    <LandingPageLayout title="Detail Event Page">
      <DetailEvent />
    </LandingPageLayout>
  );
};

export default DetailEventPage;
