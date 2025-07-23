import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import Event from "@/components/views/Event";
import React from "react";

type Props = {};

const EventPage = (props: Props) => {
  return (
    <LandingPageLayout title="Explore Event">
      <Event />
    </LandingPageLayout>
  );
};

export default EventPage;
