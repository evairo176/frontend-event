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
      <Head>
        {/* Basic Meta Tags */}
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <meta
          name="keywords"
          content={`${eventData?.name}, event, ${metaData.category}, ${metaData.location}`}
        />

        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:image" content={`${metaData.image}`} />
        <meta property="og:type" content="event" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/event/${eventData?.slug}`}
        />
        <meta property="og:site_name" content="Event Platform" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaData.title} />
        <meta name="twitter:description" content={metaData.description} />
        <meta name="twitter:image" content={`${metaData.image}`} />

        {/* Event Specific Meta Tags */}
        {eventData?.startDate && (
          <meta property="event:start_time" content={eventData.startDate} />
        )}
        {eventData?.endDate && (
          <meta property="event:end_time" content={eventData.endDate} />
        )}
        <meta property="event:location" content={metaData.location} />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: eventData?.name,
              description: metaData.description,
              image: metaData.image,
              startDate: eventData?.startDate,
              endDate: eventData?.endDate,
              location: {
                "@type": "Place",
                name: metaData.location,
                address: eventData?.address || metaData.location,
              },
              organizer: {
                "@type": "Organization",
                name: "Event Platform",
                // name: eventData?.organizer || "Event Platform",
              },
              offers: eventData?.cheapestTicket
                ? {
                    "@type": "Offer",
                    price: eventData.cheapestTicket.price,
                    priceCurrency: "IDR",
                    availability: "https://schema.org/InStock",
                  }
                : undefined,
            }),
          }}
        />

        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>

      <LandingPageLayout title={metaData.title}>
        <DetailEvent serverEventData={eventData} />
      </LandingPageLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;

  try {
    // Fetch event data on server side
    const response = await eventServices.getEventBySlug(slug as string);
    const eventData = response.data?.data;

    if (!eventData) {
      return {
        props: {
          eventData: null,
          error: "Event tidak ditemukan atau sudah tidak tersedia.",
        },
      };
    }

    return {
      props: {
        eventData,
        error: null,
      },
    };
  } catch (error) {
    console.error("Error fetching event data:", error);

    return {
      props: {
        eventData: null,
        error: "Terjadi kesalahan saat memuat data event.",
      },
    };
  }
};

export default DetailEventPage;
