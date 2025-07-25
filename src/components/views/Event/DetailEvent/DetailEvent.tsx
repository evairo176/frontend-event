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

type Props = {};

const DetailEvent = (props: Props) => {
  const { dataDetailEvent, isLoadingDetailEvent } = useDetailEvent();
  return (
    <>
      <div className="mt-20 min-h-screen px-6">
        {isLoadingDetailEvent && (
          <>
            <Breadcrumbs>
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbItem href="/event">Event</BreadcrumbItem>
              <BreadcrumbItem href="/">
                <div>
                  <Spinner size="sm" color="primary" />
                </div>
              </BreadcrumbItem>
            </Breadcrumbs>
            <section className="mt-8 flex flex-col gap-10 lg:flex-row">
              <div className="w-full lg:w-4/6">
                <Skeleton className="mb-2 h-10 w-1/2 rounded-lg" />
                <Skeleton className="mb-2 h-10 w-2/3 rounded-lg" />
                <Skeleton className="mb-2 h-10 w-2/3 rounded-lg" />
                <Skeleton className="mb-2 h-[500px] w-full rounded-lg" />
                <div>
                  <Skeleton className="mb-2 h-10 w-2/3 rounded-lg" />
                  <Skeleton className="mb-2 h-20 w-full rounded-lg" />
                </div>
              </div>
              <div className="w-full lg:w-2/6"></div>
            </section>
          </>
        )}
        {!isLoadingDetailEvent && dataDetailEvent && (
          <>
            <Breadcrumbs>
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbItem href="/event">Event</BreadcrumbItem>
              <BreadcrumbItem href="/">{dataDetailEvent?.name}</BreadcrumbItem>
            </Breadcrumbs>
            <section className="mt-8 flex flex-col gap-10 lg:flex-row">
              <div className="w-full lg:w-4/6">
                <h1 className="mb-2 text-2xl font-semibold text-danger">
                  {dataDetailEvent?.name}
                </h1>

                <div className="item-center mb-2 flex text-foreground-500">
                  <Clock width={16} className="mr-2" />
                  <p>{`${convertUTCToLocal(dataDetailEvent?.startDate)} - ${convertUTCToLocal(dataDetailEvent?.endDate)}`}</p>
                </div>

                <div className="item-center mb-2 flex text-foreground-500">
                  <MapPin width={16} className="mr-2" />
                  <p>
                    {`${dataDetailEvent?.isOnline ? "Online" : "Offline,"}`}{" "}
                    {dataDetailEvent?.isOnline ? "" : dataDetailEvent?.address}
                  </p>
                </div>

                <div className="item-center mb-2 flex text-foreground-500">
                  <Users width={16} className="mr-2" />
                  <p>{`${dataDetailEvent?.totalAudience ? dataDetailEvent?.totalAudience : 0} Peserta`}</p>
                </div>
                <Image
                  src={`${dataDetailEvent?.banner}`}
                  alt={`${dataDetailEvent?.name}`}
                  className="mb-4 aspect-video w-full rounded-lg object-cover"
                  width={1920}
                  height={1080}
                />
                <Tabs aria-label="Tab detail event" fullWidth>
                  <Tab key="description" title="Descrption">
                    <h2 className="text-xl font-semibold text-foreground-700">
                      About event
                    </h2>
                    <p className="text-foreground-500">
                      {dataDetailEvent?.description}
                    </p>
                  </Tab>
                  <Tab key="ticket" title="Ticket">
                    <DetailEventTicket tickets={dataDetailEvent?.tickets} />
                  </Tab>
                </Tabs>
              </div>
              <div className="w-full lg:w-2/6"></div>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default DetailEvent;
