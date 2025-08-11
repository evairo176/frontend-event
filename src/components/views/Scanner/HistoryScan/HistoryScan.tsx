import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import React, { Key, ReactNode, useCallback } from "react";
import { COLUMN_LIST_HISTORYSCAN } from "./HistoryScan.constants";

import { useRouter } from "next/router";

import Image from "next/image";

import ButtonAction from "@/components/commons/ButtonAction";
import { convertUTCToLocal } from "@/utils/date";
import useHistoryScan from "./useHistoryScan";

type Props = {};

const HistoryScan = (props: Props) => {
  const { push, query } = useRouter();

  const {
    dataHistoryScan,
    isLoadingHistoryScan,
    isRefetchingHistoryScan,
    refetchHistoryScan,
    selectedId,
    setSelectedId,
  } = useHistoryScan();

  const renderCell = useCallback(
    (historyscan: any, columnKey: Key) => {
      const cellValue = historyscan[columnKey as keyof typeof historyscan];
      const code = historyscan?.voucher?.code;
      const ticket = historyscan?.voucher?.ticket?.name;
      const event = historyscan?.voucher?.ticket?.event?.name;
      switch (columnKey) {
        case "status":
          let Status = (
            <Chip color="success" variant="dot">
              SUCCESS
            </Chip>
          );
          if (cellValue === "FAILED") {
            Status = (
              <Chip color="danger" variant="dot">
                FAILED
              </Chip>
            );
          }

          return Status as ReactNode;
        case "note":
          return `${cellValue}`;
        case "code":
          return `${code}`;
        case "ticket":
          return `${ticket}`;
        case "event":
          return `${event}`;
        case "icon":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
          );
        case "createdAt":
          return `${convertUTCToLocal(cellValue as string)}`;
        case "updatedAt":
          return `${convertUTCToLocal(cellValue as string)}`;
        case "actions":
          return <ButtonAction />;

        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );
  const addHistoryScanModal = useDisclosure();
  const deleteHistoryScanModal = useDisclosure();
  return (
    <section>
      {Object.keys(query)?.length > 0 && (
        <DataTable
          isLoading={isLoadingHistoryScan || isRefetchingHistoryScan}
          renderCell={renderCell}
          columns={COLUMN_LIST_HISTORYSCAN}
          totalPages={dataHistoryScan?.pagination?.totalPages}
          totalData={dataHistoryScan?.pagination?.total}
          emptyContent="HistoryScan is empty"
          data={dataHistoryScan?.data || []}
          refetch={refetchHistoryScan}
        />
      )}
    </section>
  );
};

export default HistoryScan;
