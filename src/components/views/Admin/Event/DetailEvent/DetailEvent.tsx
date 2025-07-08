import { Tab, Tabs } from "@heroui/react";
import React from "react";
import BannerTab from "./BannerTab";
import InfoTab from "./InfoTab";
import useDetailEvent from "./useDetailEvent";

type Props = {};

const DetailEvent = (props: Props) => {
  const {
    dataEvent,

    handleUpdateEvent,
    isPendingMutateUpdateEvent,
    isSuccessMutateUpdateEvent,
  } = useDetailEvent();

  return (
    <div>
      <Tabs aria-label="options">
        <Tab key={"banner"} title="Banner">
          <BannerTab
            currentBanner={dataEvent?.banner}
            onUpdate={handleUpdateEvent}
            isPendingMutateUpdateEvent={isPendingMutateUpdateEvent}
            isSuccessMutateUpdateEvent={isSuccessMutateUpdateEvent}
          />
        </Tab>
        <Tab key={"info"} title="Info">
          <InfoTab
            dataEvent={dataEvent}
            onUpdate={handleUpdateEvent}
            isPendingMutateUpdateEvent={isPendingMutateUpdateEvent}
            isSuccessMutateUpdateEvent={isSuccessMutateUpdateEvent}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default DetailEvent;
