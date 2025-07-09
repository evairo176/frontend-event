import DataTable from "@/components/ui/DataTable";
import { convertIDR } from "@/utils/currency";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@heroui/react";
import { ArrowLeft, Plus } from "lucide-react";
import React, { Key, ReactNode, useCallback } from "react";
import { COLUMN_LIST_TICKET } from "./TicketTab.constants";
import { useRouter } from "next/router";
import useTicketTab from "./useTicketTab";
import AddTicketModal from "./AddTicketModal";
import DeleteTicketModal from "./DeleteTicketModal";
import ButtonAction from "@/components/commons/ButtonAction";
import DetailTicketModal from "./DetailTicketModal";

type Props = {};

const TicketTab = (props: Props) => {
  const { query, back } = useRouter();
  const addTicketModal = useDisclosure();
  const updateTicketModal = useDisclosure();
  const deleteTicketModal = useDisclosure();
  const {
    dataTicket,
    isLoadingTicket,
    isRefetchingTicket,
    refetchTicket,
    selectedId,
    setSelectedId,
    ticket,
    setTicket,
  } = useTicketTab();

  const renderCell = useCallback((ticket: any, columnKey: Key) => {
    const cellValue = ticket[columnKey as keyof typeof ticket];

    switch (columnKey) {
      case "price":
        return `${convertIDR(cellValue)}`;
      case "actions":
        return (
          <ButtonAction
            onPressButtonDetail={() => {
              setTicket(ticket);
              updateTicketModal.onOpen();
            }}
            onPressButtonDelete={() => {
              setSelectedId(`${ticket.id}`);
              deleteTicketModal.onOpen();
            }}
          />
        );

      default:
        return cellValue as ReactNode;
    }
  }, []);
  return (
    <>
      <Card className="w-full p-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Ticket Information</h1>
            <p className="text-small text-default-500">
              Manage information of this ticket
            </p>
          </div>
        </CardHeader>
        <CardBody>
          {Object.keys(query)?.length > 0 && (
            <DataTable
              isLoading={isLoadingTicket || isRefetchingTicket}
              onClickButtonTopContent={() => addTicketModal.onOpen()}
              buttonTopContentLabel="Create Ticket"
              renderCell={renderCell}
              columns={COLUMN_LIST_TICKET}
              totalPages={dataTicket?.pagination?.totalPages}
              totalData={dataTicket?.pagination?.total}
              emptyContent="Ticket is empty"
              data={dataTicket?.data || []}
            />
          )}
        </CardBody>
      </Card>
      <AddTicketModal refetchTicket={refetchTicket} {...addTicketModal} />
      <DeleteTicketModal
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchTicket={refetchTicket}
        {...deleteTicketModal}
      />
      <DetailTicketModal
        selectedDataTicket={ticket}
        setSelectedDataTicket={setTicket}
        refetchTicket={refetchTicket}
        {...updateTicketModal}
      />
    </>
  );
};

export default TicketTab;
