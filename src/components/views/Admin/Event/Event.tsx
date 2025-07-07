import DataTable from "@/components/ui/DataTable";
import { Button, Chip, useDisclosure } from "@heroui/react";
import { Eye, Trash } from "lucide-react";
import React, { Key, ReactNode, useCallback, useEffect } from "react";

import { useRouter } from "next/router";

import Image from "next/image";
import useEvent from "./useEvent";
import { COLUMN_LIST_EVENT } from "./Event.constants";
import ButtonAction from "@/components/commons/ButtonAction";
import AddEventModal from "./AddEventModal/AddEventModal";

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
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];

      switch (columnKey) {
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
              {cellValue === true ? "Published" : "Not Published"}{" "}
            </Chip>
          );
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
      {/* <DeleteEventModal
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchEvent={refetchEvent}
        {...deleteEventModal}
      /> */}
    </section>
  );
};

export default Event;
