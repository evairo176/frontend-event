import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import React, { Key, ReactNode, useCallback } from "react";
import { COLUMN_LIST_SESSION } from "./MeSession.constants";
import useMeSession from "./useMeSession";
import { useRouter } from "next/router";
import Image from "next/image";
import ButtonAction from "@/components/commons/ButtonAction";
import { convertUTCToLocal } from "@/utils/date";
import { parseUserAgent } from "@/utils/parse-useragent";
import DeleteMeSessionModal from "./DeleteMeSession";

type Props = {};

const MeSession = (props: Props) => {
  const { push, query } = useRouter();

  const {
    dataSession,
    refetchSession,
    isLoadingSession,
    isRefetchingSession,
    selectedId,
    setSelectedId,
  } = useMeSession();

  const renderCell = useCallback(
    (MeSession: any, columnKey: Key) => {
      const cellValue = MeSession[columnKey as keyof typeof MeSession];
      const {
        os,
        browser,
        timeAgo,
        icon: Icon,
      } = parseUserAgent(MeSession.userAgent, MeSession?.createdAt);

      switch (columnKey) {
        case "icon":
          return <Icon className="h-4 w-4 text-emerald-500" />;
        case "os":
          return `${os}`;
        case "browser":
          return `${browser}`;
        case "timeAgo":
          return `${timeAgo}`;
        case "isCurrent":
          if (cellValue === true) {
            return (
              <Chip size="sm" variant="dot" color="success">
                Active
              </Chip>
            );
          }
          return (
            <Chip size="sm" variant="dot" color="danger">
              Inactive
            </Chip>
          );
        case "createdAt":
          return `${convertUTCToLocal(cellValue as string)}`;
        case "updatedAt":
          return `${convertUTCToLocal(cellValue as string)}`;
        case "actions":
          return (
            <ButtonAction
              onPressButtonDetail={() => push(`/admin/session/${MeSession.id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${MeSession.id}`);
                deleteMeSessionModal.onOpen();
              }}
            />
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  const deleteMeSessionModal = useDisclosure();
  return (
    <section>
      {Object.keys(query)?.length > 0 && (
        <DataTable
          isLoading={isLoadingSession || isRefetchingSession}
          renderCell={renderCell}
          columns={COLUMN_LIST_SESSION}
          totalPages={dataSession?.pagination?.totalPages}
          totalData={dataSession?.pagination?.total}
          emptyContent="Session is empty"
          data={dataSession?.data || []}
          refetch={refetchSession}
        />
      )}

      <DeleteMeSessionModal
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchSession={refetchSession}
        {...deleteMeSessionModal}
      />
    </section>
  );
};

export default MeSession;
