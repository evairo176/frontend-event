import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import DetailEvent from "@/components/views/Event/DetailEvent";
import eventServices from "@/services/event.service";
import { IEventHome } from "@/types/Event";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";

type Props = {
  eventData: IEventHome | null;
  error?: string;
};

const DetailEventPage = ({ eventData, error }: Props) => {
  // Generate meta data based on event data
  const generateMetaData = () => {
    if (!eventData) {
      return {
        title: "Event Tidak Ditemukan",
        description: "Event yang Anda cari tidak ditemukan.",
        image: "/images/default-event.jpg",
      };
    }

    return {
      title: `${eventData.name} | Event Terbaik`,
      description:
        eventData.description ||
        `Bergabunglah dengan ${eventData.name}. Event menarik yang tidak boleh Anda lewatkan!`,
      image: eventData.banner || "/images/default-event.jpg",
      startDate: eventData.startDate,
      endDate: eventData.endDate,
      location: eventData.city?.name || "Online",
      category: eventData.category?.name || "Event",
    };
  };

  const metaData = generateMetaData();

  if (error) {
    return (
      <>
        <Head>
          <title>Error - Event Tidak Ditemukan</title>
          <meta
            name="description"
            content="Event yang Anda cari tidak ditemukan."
          />
        </Head>
        <LandingPageLayout title="Error">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-800">
              Event Tidak Ditemukan
            </h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </LandingPageLayout>
      </>
    );
  }

  return (
    <>
      <LandingPageLayout title={metaData.title}>
        <DetailEvent />
      </LandingPageLayout>
    </>
  );
};

export default DetailEventPage;
