import DataTable from "@/components/ui/DataTable";
import { Chip, Tooltip, useDisclosure } from "@heroui/react";
import React, { Key, ReactNode, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import useEvent from "./useEvent";
import { COLUMN_LIST_EVENT } from "./Event.constants";
import ButtonAction from "@/components/commons/ButtonAction";
import AddEventModal from "./AddEventModal/AddEventModal";
import DeleteEventModal from "./DeleteEventModal";
import { convertUTCToLocal } from "@/utils/date";

type Props = {};

const Event = (props: Props) => {
  const { push, query } = useRouter();

  const {
    dataEvent,
    isLoadingEvent,
    isRefetchingEvent,
    refetchEvent,
    selectedId,
    setSelectedId,
  } = useEvent();

  const renderCell = useCallback(
    (event: any, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];

      switch (columnKey) {
        case "city.name":
          return (
            <Tooltip content={event?.city?.name}>
              <div className="line-clamp-2 cursor-pointer">
                {event?.city?.name}
              </div>
            </Tooltip>
          );
        case "category.name":
          return (
            <Tooltip content={event?.category?.name}>
              <div className="line-clamp-2 cursor-pointer">
                {event?.category?.name}
              </div>
            </Tooltip>
          );

        case "banner":
          return (
            <Image
              className="aspect-video w-36 rounded-lg object-cover"
              src={`${cellValue}`}
              alt="icon"
              width={200}
              height={100}
            />
          );
        case "isPublished":
          return (
            <Chip
              size="sm"
              variant="flat"
              color={cellValue ? "success" : "warning"}
            >
              {cellValue === true ? "Published" : "Not Published"}
            </Chip>
          );
        case "isFeatured":
          return (
            <Chip
              size="sm"
              variant="flat"
              color={cellValue ? "success" : "warning"}
            >
              {cellValue === true ? "Yes" : "No"}
            </Chip>
          );
        case "isOnline":
          return (
            <Chip
              size="sm"
              variant="flat"
              color={cellValue ? "success" : "warning"}
            >
              {cellValue === true ? "Online" : "Offline"}
            </Chip>
          );
        case "createdAt":
          return `${convertUTCToLocal(cellValue)}`;
        case "updatedAt":
          return `${convertUTCToLocal(cellValue)}`;
        case "actions":
          return (
            <ButtonAction
              onPressButtonDetail={() => push(`/admin/event/${event.id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${event.id}`);
                deleteEventModal.onOpen();
              }}
            />
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );
  const addEventModal = useDisclosure();
  const deleteEventModal = useDisclosure();
  return (
    <section>
      {Object.keys(query)?.length > 0 && (
        <DataTable
          isLoading={isLoadingEvent || isRefetchingEvent}
          onClickButtonTopContent={() => addEventModal.onOpen()}
          buttonTopContentLabel="Create Event"
          renderCell={renderCell}
          columns={COLUMN_LIST_EVENT}
          totalPages={dataEvent?.pagination?.totalPages}
          totalData={dataEvent?.pagination?.total}
          emptyContent="Event is empty"
          data={dataEvent?.data || []}
        />
      )}
      <AddEventModal refetchEvent={refetchEvent} {...addEventModal} />
      <DeleteEventModal
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchEvent={refetchEvent}
        {...deleteEventModal}
      />
    </section>
  );
};

export default Event;
