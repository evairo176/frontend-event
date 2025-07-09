import { Tab, Tabs } from "@heroui/react";
import React from "react";
import BannerTab from "./BannerTab";
import InfoTab from "./InfoTab";
import useDetailEvent from "./useDetailEvent";
import LocationTab from "./LocationTab";
import TicketTab from "./TicketTab";
import { useRouter } from "next/router";

type Props = {};

const DetailEvent = (props: Props) => {
  const { replace, pathname, query } = useRouter();
  const {
    dataEvent,

    handleUpdateBannerEvent,
    handleUpdateInfoEvent,
    handleUpdateLocationEvent,
    isPendingMutateUpdateEvent,
    isSuccessMutateUpdateEvent,
  } = useDetailEvent();

  return (
    <div>
      <Tabs aria-label="options">
        <Tab key={"banner"} title="Banner">
          <BannerTab
            currentBanner={dataEvent?.banner}
            onUpdate={handleUpdateBannerEvent}
            isPendingMutateUpdateEvent={isPendingMutateUpdateEvent}
            isSuccessMutateUpdateEvent={isSuccessMutateUpdateEvent}
          />
        </Tab>
        <Tab key={"info"} title="Info">
          <InfoTab
            dataEvent={dataEvent}
            onUpdate={handleUpdateInfoEvent}
            isPendingMutateUpdateEvent={isPendingMutateUpdateEvent}
            isSuccessMutateUpdateEvent={isSuccessMutateUpdateEvent}
          />
        </Tab>
        <Tab key={"location"} title="Location">
          <LocationTab
            dataEvent={dataEvent}
            onUpdate={handleUpdateLocationEvent}
            isPendingMutateUpdateEvent={isPendingMutateUpdateEvent}
            isSuccessMutateUpdateEvent={isSuccessMutateUpdateEvent}
          />
        </Tab>
        <Tab key={"ticket"} title="Ticket">
          <TicketTab />
        </Tab>
      </Tabs>
    </div>
  );
};

export default DetailEvent;
