import DataTable from "@/components/ui/DataTable";

import React, { Key, ReactNode, useCallback } from "react";
import { COLUMN_LIST_TRANSACTION } from "./Transaction.constants";

import { useRouter } from "next/router";

import { convertUTCToLocal } from "@/utils/date";
import useTransaction from "./useTransaction";
import { convertIDR } from "@/utils/currency";
import { Chip } from "@heroui/react";
import ButtonAction from "@/components/commons/ButtonAction";

type Props = {};

const Transaction = (props: Props) => {
  const { push, query } = useRouter();

  const {
    dataTransaction,
    isLoadingTransaction,
    isRefetchingTransaction,
    refetchTransaction,
    selectedId,
    setSelectedId,
  } = useTransaction();

  const renderCell = useCallback(
    (transaction: Record<string, unknown>, columnKey: Key) => {
      const cellValue = transaction[columnKey as keyof typeof transaction];

      switch (columnKey) {
        case "orderId":
          return <span className="flex">{cellValue as ReactNode}</span>;
        case "total":
          return `${convertIDR(Number(cellValue))}`;
        case "status":
          if (cellValue === "COMPLETED") {
            return (
              <Chip size="sm" variant="bordered" color="success">
                {cellValue}
              </Chip>
            );
          }
          if (cellValue === "CANCELLED") {
            return (
              <Chip size="sm" variant="bordered" color="danger">
                {cellValue}
              </Chip>
            );
          }
          if (cellValue === "PENDING") {
            return (
              <Chip size="sm" variant="bordered" color="warning">
                {cellValue}
              </Chip>
            );
          }
        case "createdAt":
          return `${convertUTCToLocal(cellValue as string)}`;
        case "updatedAt":
          return `${convertUTCToLocal(cellValue as string)}`;
        case "actions":
          return (
            <ButtonAction
              onPressButtonDelete={() => {}}
              onPressButtonDetail={() =>
                push(`/admin/transaction/${transaction?.orderId}`)
              }
            />
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query)?.length > 0 && (
        <DataTable
          isLoading={isLoadingTransaction || isRefetchingTransaction}
          onClickButtonTopContent={() => {}}
          renderCell={renderCell}
          columns={COLUMN_LIST_TRANSACTION}
          totalPages={dataTransaction?.pagination?.totalPages}
          totalData={dataTransaction?.pagination?.total}
          emptyContent="Category is empty"
          data={dataTransaction?.data || []}
          refetch={refetchTransaction}
        />
      )}
    </section>
  );
};

export default Transaction;
