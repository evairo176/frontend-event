import React from "react";
import useDetailEvent from "./useDetailEvent";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Skeleton,
  Spinner,
  Tab,
  Tabs,
} from "@heroui/react";
import { Clock, MapPin, Users } from "lucide-react";
import { convertUTCToLocal } from "@/utils/date";
import Image from "next/image";
import DetailEventTicket from "./DetailEventTicket";
import { IEvent } from "@/types/Event";
import DetailEventCart from "./DetailEventCart";
import Script from "next/script";
import environment from "@/config/environment";

type Props = {
  serverEventData?: IEvent | null;
};

const DetailEvent = ({ serverEventData }: Props) => {
  const {
    dataDetailEvent,
    isLoadingDetailEvent,

    carts,
    getTicketDataInCart,
    handleAddToCart,
    handleChangeQuantity,

    mutateCreateOrder,
    isPendingMutateCreateOrder,
  } = useDetailEvent();

  // Use server data if available, otherwise use client-side data
  const eventData = serverEventData || dataDetailEvent;
  const isLoading = !serverEventData && isLoadingDetailEvent;
  console.log(environment.MIDTRANS_SNAP_URL);
  return (
    <>
      <div className="mt-20 min-h-screen px-6">
        <Script
          src={environment.MIDTRANS_SNAP_URL}
          data-client-key={environment.MIDTRANS_CLIENT_KEY}
          strategy="lazyOnload"
        />
        {isLoading && (
          <div className="animate-pulse">
            {/* Breadcrumb Skeleton */}
            <div className="mb-8 flex items-center space-x-2">
              <Skeleton className="h-4 w-12 rounded" />
              <span className="text-gray-300">/</span>
              <Skeleton className="h-4 w-16 rounded" />
              <span className="text-gray-300">/</span>
              <Skeleton className="h-4 w-24 rounded" />
            </div>

            <section className="flex flex-col gap-10 lg:flex-row">
              {/* Main Content Skeleton */}
              <div className="w-full lg:w-4/6">
                {/* Event Title Skeleton */}
                <div className="mb-6">
                  <Skeleton className="mb-2 h-8 w-3/4 rounded-lg" />
                  <Skeleton className="h-6 w-1/2 rounded-lg" />
                </div>

                {/* Event Info Skeleton */}
                <div className="mb-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-48 rounded" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-36 rounded" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-28 rounded" />
                  </div>
                </div>

                {/* Banner Image Skeleton */}
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <Skeleton className="aspect-video w-full" />
                  <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>

                {/* Tabs Skeleton */}
                <div className="mb-4">
                  <div className="flex border-b border-gray-200">
                    <Skeleton className="mr-6 h-10 w-24 rounded-t-lg" />
                    <Skeleton className="h-10 w-20 rounded-t-lg" />
                  </div>
                </div>

                {/* Tab Content Skeleton */}
                <div className="space-y-4">
                  <Skeleton className="h-6 w-32 rounded" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-3/4 rounded" />
                    <Skeleton className="h-4 w-5/6 rounded" />
                    <Skeleton className="h-4 w-2/3 rounded" />
                  </div>
                </div>
              </div>

              {/* Sidebar Skeleton */}
              <div className="w-full lg:w-2/6">
                <div className="sticky top-24 space-y-6">
                  {/* Ticket Card Skeleton */}
                  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <Skeleton className="mb-4 h-6 w-32 rounded" />

                    {/* Ticket Options */}
                    <div className="space-y-4">
                      {[1, 2, 3].map((item) => (
                        <div
                          key={item}
                          className="rounded-lg border border-gray-100 p-4"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <Skeleton className="mb-2 h-5 w-24 rounded" />
                              <Skeleton className="h-4 w-16 rounded" />
                            </div>
                            <Skeleton className="h-6 w-20 rounded" />
                          </div>
                        </div>
                      ))}
                    </div>

                    <Skeleton className="mt-6 h-12 w-full rounded-lg" />
                  </div>

                  {/* Event Organizer Skeleton */}
                  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <Skeleton className="mb-4 h-6 w-28 rounded" />
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="mb-1 h-4 w-24 rounded" />
                        <Skeleton className="h-3 w-16 rounded" />
                      </div>
                    </div>
                  </div>

                  {/* Share Skeleton */}
                  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <Skeleton className="mb-4 h-6 w-20 rounded" />
                    <div className="flex gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <Skeleton className="h-10 w-10 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Loading Indicator with Dots Animation */}
            <div className="fixed bottom-8 right-8 z-50">
              <div className="flex items-center gap-3 rounded-full border border-gray-100 bg-white px-4 py-2 shadow-lg">
                <Spinner size="sm" color="primary" />
                <span className="text-sm font-medium text-gray-600">
                  Memuat event
                  <span className="loading-dots ml-1">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        )}
        {!isLoading && eventData && (
          <>
            <Breadcrumbs>
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbItem href="/event">Event</BreadcrumbItem>
              <BreadcrumbItem href="/">{eventData?.name}</BreadcrumbItem>
            </Breadcrumbs>
            <section className="mt-8 flex flex-col gap-10 lg:flex-row">
              <div className="w-full lg:w-4/6">
                <h1 className="mb-2 text-2xl font-semibold text-danger">
                  {eventData?.name}
                </h1>

                <div className="item-center mb-2 flex text-foreground-500">
                  <Clock width={16} className="mr-2" />
                  <p>{`${convertUTCToLocal(eventData?.startDate)} - ${convertUTCToLocal(eventData?.endDate)}`}</p>
                </div>

                <div className="item-center mb-2 flex text-foreground-500">
                  <MapPin width={16} className="mr-2" />
                  <p>
                    {`${eventData?.isOnline ? "Online" : "Offline,"}`}{" "}
                    {eventData?.isOnline ? "" : eventData?.address}
                  </p>
                </div>

                <div className="item-center mb-2 flex text-foreground-500">
                  <Users width={16} className="mr-2" />
                  <p>{`${eventData?.totalAudience ? eventData?.totalAudience : 0} Peserta`}</p>
                </div>
                {eventData?.banner && (
                  <Image
                    src={`${eventData?.banner}`}
                    alt={`${eventData?.name}`}
                    className="mb-4 aspect-video w-full rounded-lg object-cover"
                    width={1920}
                    height={1080}
                  />
                )}

                <Tabs aria-label="Tab detail event" fullWidth>
                  <Tab key="description" title="Descrption">
                    <h2 className="text-xl font-semibold text-foreground-700">
                      About event
                    </h2>
                    <p className="text-foreground-500">
                      {eventData?.description}
                    </p>
                  </Tab>
                  ha
                  <Tab key="ticket" title="Ticket">
                    <DetailEventTicket
                      tickets={eventData?.tickets}
                      carts={carts}
                      handleAddToCart={handleAddToCart}
                    />
                  </Tab>
                </Tabs>
              </div>
              <div className="w-full lg:w-2/6">
                <DetailEventCart
                  carts={carts}
                  getTicketDataInCart={getTicketDataInCart}
                  handleChangeQuantity={handleChangeQuantity}
                  onCreateOrder={mutateCreateOrder}
                  isLoadingCreateOrder={isPendingMutateCreateOrder}
                />
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default DetailEvent;
