import React from "react";
import useEvent from "./useEvent";

import HomeList from "../Home/HomeList";
import EventFooter from "./EventFooter";
import EventFilter from "./EventFilter";

type Props = {};

const Event = (props: Props) => {
  const { dataEvent, isLoadingEvent } = useEvent();

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <div className="flex w-full flex-col justify-center gap-6 px-4 lg:flex-row lg:px-0">
        <EventFilter />
        <div className="min-h-screen w-full lg:w-fit lg:flex-1">
          <HomeList
            totalSkeleton={6}
            explore
            events={dataEvent?.data || []}
            isLoadingEvent={isLoadingEvent}
          />
          {!isLoadingEvent && dataEvent?.data?.length > 0 && (
            <EventFooter
              currentTotal={dataEvent?.data?.length}
              total={dataEvent?.pagination?.total}
              totalPages={dataEvent?.pagination?.totalPages}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Event;
