import DataTable from "@/components/ui/DataTable";
import { Avatar, Button, Chip, Tooltip, useDisclosure } from "@heroui/react";
import React, { Key, ReactNode, useCallback } from "react";
import { COLUMN_LIST_REFUND } from "./Refund.constants";
import Image from "next/image";
import ButtonAction from "@/components/commons/ButtonAction";
import { convertUTCToLocal } from "@/utils/date";

import { convertIDR } from "@/utils/currency";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import ActionStatusModal from "./ActionStatusModal/ActionStatusModal";
import useRefund from "./useRefund";
import { useRouter } from "next/router";

type Props = {};

const Refund = (props: Props) => {
  const { push, query } = useRouter();

  const {
    dataRefund,
    isLoadingRefund,
    isRefetchingRefund,
    refetchRefund,
    selectedId,
    setSelectedId,
  } = useRefund();

  const renderCell = useCallback(
    (refund: any, columnKey: Key) => {
      const cellValue = refund[columnKey as keyof typeof refund];

      switch (columnKey) {
        case "requester":
          return (
            <div className="flex flex-row items-center gap-2">
              <Avatar
                size="lg"
                src={`${refund?.requester?.profilePicture ? refund?.requester?.profilePicture : "/images/Refund/user.png"}`}
              />
              <div>
                <h3 className="text-xs text-gray-700">
                  {refund?.requester?.fullname}
                </h3>
                <p className="text-xs text-gray-500">
                  {refund?.requester?.Refundname}
                </p>
                <p className="text-xs text-gray-500">
                  {refund?.requester?.email}
                </p>
              </div>
            </div>
          );
        case "order":
          return (
            <Tooltip
              content={
                <div>
                  <div className="text-xs text-gray-700">
                    Total :{" "}
                    <span className="font-bold">
                      {convertIDR(refund?.order?.total)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Tanggal order :{" "}
                    <span className="font-bold">
                      {convertUTCToLocal(refund?.order?.createdAt)}
                    </span>
                  </p>
                </div>
              }
              showArrow={true}
            >
              <div>
                <h3 className="text-nowrap text-xs text-gray-700">
                  {refund?.order?.orderId}
                </h3>
                <p className="text-nowrap text-xs text-gray-500">
                  {refund?.order?.status}
                </p>
              </div>
            </Tooltip>
          );
        case "ticket":
          return (
            <Tooltip
              className="p-3"
              content={
                <div className="flex">
                  <Table
                    removeWrapper
                    aria-label="menampilkan detail ticket refund admin"
                    isCompact
                    topContentPlacement="outside"
                    className="border-none bg-none shadow-none"
                  >
                    <TableHeader>
                      <TableColumn>Name</TableColumn>
                      <TableColumn>Price</TableColumn>
                      <TableColumn>Quantity</TableColumn>
                      <TableColumn>Total</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {refund?.lines.map((line: any, index: number) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>
                              {" "}
                              {line?.orderItem?.ticket?.name}
                            </TableCell>
                            <TableCell>{line?.orderItem?.price}</TableCell>
                            <TableCell> {line?.orderItem?.quantity}</TableCell>
                            <TableCell>
                              {" "}
                              {line?.orderItem?.price *
                                line?.orderItem?.quantity}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              }
              showArrow={true}
            >
              <div className="flex flex-wrap gap-1">
                {refund?.lines.map((line: any, index: number) => {
                  return (
                    <Chip key={index} size="sm">
                      {line?.orderItem?.quantity}{" "}
                      {line?.orderItem?.ticket?.name}
                    </Chip>
                  );
                })}
              </div>
            </Tooltip>
          );
        case "icon":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
          );
        case "event":
          return (
            <h3 className="text-nowrap text-sm text-gray-700">
              {refund?.lines[0]?.orderItem?.event?.name}
            </h3>
          );
        case "ProcessedBy":
          return (
            <h3 className="text-nowrap text-sm text-gray-700">
              {refund?.processedBy?.fullname}
            </h3>
          );
        case "reason":
          return (
            <div>
              <p className="text-nowrap text-xs text-gray-500">
                Admin: {refund?.adminNote}
              </p>
              <p className="text-nowrap text-xs text-gray-500">
                Refund: {refund?.reason}
              </p>
            </div>
          );

        case "totalAmount":
          return `${convertIDR(Number(cellValue))}`;
        case "status":
          let Status = (
            <Chip
              color="warning"
              variant="dot"
              onClick={() => {
                actionStatusModal.onOpen();
                setSelectedId(refund.id);
              }}
            >
              PENDING
            </Chip>
          );
          if (cellValue === "PAID") {
            Status = (
              <Chip color="success" variant="dot">
                PAID
              </Chip>
            );
          }
          if (cellValue === "REJECTED") {
            Status = (
              <Chip color="danger" variant="dot">
                REJECT
              </Chip>
            );
          }
          return Status as ReactNode;
        case "createdAt":
          return `${convertUTCToLocal(cellValue as string)}`;
        case "updatedAt":
          return `${convertUTCToLocal(cellValue as string)}`;
        case "actions":
          return (
            <ButtonAction
              onPressButtonDetail={() => push(`/admin/refund/${refund.id}`)}
            />
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );
  const actionStatusModal = useDisclosure();
  return (
    <section>
      {Object.keys(query)?.length > 0 && (
        <DataTable
          isLoading={isLoadingRefund || isRefetchingRefund}
          renderCell={renderCell}
          columns={COLUMN_LIST_REFUND}
          totalPages={dataRefund?.pagination?.totalPages}
          totalData={dataRefund?.pagination?.total}
          emptyContent="Refundis empty"
          data={dataRefund?.data || []}
          refetch={refetchRefund}
        />
      )}

      <ActionStatusModal
        refetchRefund={refetchRefund}
        {...actionStatusModal}
        selectedId={selectedId}
        confirmText="Confirm"
        cancelText="Cancel"
      />
    </section>
  );
};

export default Refund;
