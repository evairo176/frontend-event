"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clipboard,
  FileText,
  CalendarDays,
  CheckCircle2,
  Clock,
  UserRound,
  Info,
  Ticket,
  Receipt,
} from "lucide-react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  Skeleton,
} from "@heroui/react";
import useDetailRefund from "./useDetailRefund";
import { convertUTCToLocal, diff } from "@/utils/date";
import { convertIDR } from "@/utils/currency";

const copy = async (text?: string) => {
  try {
    if (text) await navigator.clipboard.writeText(text);
  } catch {}
};

// Status → Chip color map
const statusColor = (s?: string): any => {
  switch (s) {
    case "PENDING":
      return "warning";
    case "APPROVED":
      return "primary";
    case "PAID":
      return "success";
    case "REJECTED":
      return "danger";
    default:
      return "default";
  }
};

const HeaderSkeleton: React.FC = () => (
  <div className="flex items-center gap-3">
    <Button
      as={Link}
      href="#"
      isIconOnly
      variant="light"
      className="rounded-full"
      isDisabled
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
    <Skeleton className="h-7 w-40 rounded-md" />
    <div className="ml-auto flex items-center gap-2">
      <Skeleton className="h-6 w-24 rounded-full" />
      <Skeleton className="h-9 w-28 rounded-xl" />
    </div>
  </div>
);

const SummaryCardSkeleton: React.FC = () => (
  <Card className="col-span-1 lg:col-span-2">
    <CardHeader className="flex items-center gap-2">
      <Receipt className="h-5 w-5 text-default-300" />
      <Skeleton className="h-5 w-48 rounded-md" />
    </CardHeader>
    <CardBody className="space-y-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="h-6 w-24 rounded-md" />
          </div>
        ))}
      </div>
      <Divider className="my-2" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-5 w-64 rounded-md" />
            <Skeleton className="h-4 w-40 rounded-md" />
          </div>
        ))}
      </div>
      <Divider className="my-2" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="h-5 w-40 rounded-md" />
            <Skeleton className="h-3 w-24 rounded-md" />
          </div>
        ))}
      </div>
      <Divider className="my-2" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        ))}
      </div>
    </CardBody>
  </Card>
);

const LedgerCardSkeleton: React.FC = () => (
  <Card>
    <CardHeader className="flex items-center gap-2">
      <Receipt className="h-5 w-5 text-default-300" />
      <Skeleton className="h-5 w-24 rounded-md" />
    </CardHeader>
    <CardBody className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <React.Fragment key={i}>
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="h-4 w-32 rounded-md" />
          </div>
          {i < 2 && <Divider />}
        </React.Fragment>
      ))}
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
    </CardBody>
  </Card>
);

const LinesTableSkeleton: React.FC = () => (
  <Card>
    <CardHeader className="flex items-center gap-2">
      <Ticket className="h-5 w-5 text-default-300" />
      <Skeleton className="h-5 w-28 rounded-md" />
    </CardHeader>
    <CardBody>
      <Table
        aria-label="Refund ticket lines placeholder"
        removeWrapper
        isCompact
      >
        <TableHeader>
          <TableColumn>ORDERITEM ID</TableColumn>
          <TableColumn>EVENT</TableColumn>
          <TableColumn>TICKET</TableColumn>
          <TableColumn className="text-right">QTY</TableColumn>
          <TableColumn className="text-right">AMOUNT</TableColumn>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 3 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-4 w-48 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-40 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24 rounded-md" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="ml-auto h-4 w-10 rounded-md" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="ml-auto h-4 w-20 rounded-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardBody>
  </Card>
);

const DetailRefund = () => {
  const { dataRefund: refund, isLoadingRefund } = useDetailRefund();

  // Loading skeleton
  if (isLoadingRefund) {
    return (
      <div className="space-y-6 p-4 md:px-0">
        <HeaderSkeleton />
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
          <SummaryCardSkeleton />
          <LedgerCardSkeleton />
        </div>
        <LinesTableSkeleton />
      </div>
    );
  }

  const uniqueEvents = Array.from(
    new Set(refund?.lines?.map((l: any) => l.orderItem.event.name) ?? []),
  );
  const ticketsCount = (refund?.lines ?? []).reduce(
    (a: number, b: any) => a + (b.quantity || 0),
    0,
  );

  return (
    <div className="space-y-6 p-4 md:px-0">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          as={Link}
          href="/admin/refund"
          isIconOnly
          variant="light"
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Kembali
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <Chip
            color={statusColor(refund?.status)}
            variant="flat"
            className="font-medium"
          >
            {refund?.status}
          </Chip>
          <Tooltip content="Copy Refund ID">
            <Button
              variant="bordered"
              size="sm"
              className="gap-2"
              onPress={() => copy(refund?.id)}
            >
              <FileText className="h-4 w-4" /> Copy ID
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Top grid */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
        {/* Summary */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            <div className="text-base font-semibold">Refund #{refund?.id}</div>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div>
                <div className="text-sm text-default-500">Total Amount</div>
                <div className="text-lg font-semibold">
                  {convertIDR(refund?.totalAmount)}
                </div>
              </div>
              <div>
                <div className="text-sm text-default-500">Items (Qty)</div>
                <div className="text-lg font-semibold">{ticketsCount}</div>
              </div>
              <div>
                <div className="text-sm text-default-500">Order</div>
                <div className="flex items-center gap-2 font-medium">
                  <Link
                    href={`/admin/transaction/${refund?.order.orderId}`}
                    className="text-sm text-primary underline underline-offset-4"
                  >
                    {refund?.order.orderId}
                  </Link>
                </div>
              </div>
              <div>
                <div className="text-sm text-default-500">Events</div>
                <div className="font-medium">
                  {uniqueEvents.length > 2
                    ? `${uniqueEvents.length} events`
                    : uniqueEvents.join(", ")}
                </div>
              </div>
            </div>

            <Divider className="my-2" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-default-500">
                  <UserRound className="h-4 w-4" /> Requester
                </div>
                <div className="font-medium">
                  {refund?.requester.fullname}{" "}
                  <span className="text-default-500">
                    (@{refund?.requester.username})
                  </span>
                </div>
                <div className="text-sm text-default-500">
                  {refund?.requester.email}
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-default-500">
                  <Info className="h-4 w-4" /> Processed By
                </div>
                <div className="font-medium">
                  {refund?.processedBy?.fullname ?? "—"}
                  {refund?.processedBy?.username ? (
                    <span className="text-default-500">
                      {" "}
                      (@{refund?.processedBy.username})
                    </span>
                  ) : null}
                </div>
                <div className="text-sm text-default-500">
                  {refund?.processedBy?.email ?? "—"}
                </div>
              </div>
            </div>

            <Divider className="my-2" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-default-500">
                  <CalendarDays className="h-4 w-4" /> Created
                </div>
                <div className="font-medium">
                  {convertUTCToLocal(refund?.createdAt)}
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-default-500">
                  <CheckCircle2 className="h-4 w-4" /> Approved
                </div>
                <div className="font-medium">
                  {convertUTCToLocal(refund?.approvedAt)}
                </div>
                <div className="text-xs text-default-500">
                  {refund?.approvedAt &&
                  diff(refund?.approvedAt, refund?.createdAt)
                    ? `TTA: ${diff(refund?.approvedAt, refund?.createdAt)}`
                    : "—"}
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-default-500">
                  <Clock className="h-4 w-4" /> Paid
                </div>
                <div className="font-medium">
                  {convertUTCToLocal(refund?.paidAt)}
                </div>
                <div className="text-xs text-default-500">
                  {refund?.paidAt &&
                  refund?.approvedAt &&
                  diff(refund?.paidAt, refund?.approvedAt)
                    ? `TTP: ${diff(refund?.paidAt, refund?.approvedAt)}`
                    : "—"}
                </div>
              </div>
            </div>

            <Divider className="my-2" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="text-sm text-default-500">Reason</div>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed">
                  {refund?.reason || "—"}
                </p>
              </div>
              <div>
                <div className="text-sm text-default-500">Admin Note</div>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed">
                  {refund?.adminNote || "—"}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Ledger / Actions */}
        <Card>
          <CardHeader className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            <div className="text-base font-semibold">Ledger</div>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-default-500">Balance Tx ID</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs">
                  {refund?.balanceTransactionId ?? "—"}
                </span>
                {refund?.balanceTransactionId && (
                  <Tooltip content="Copy Tx ID">
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={() => copy(refund?.balanceTransactionId!)}
                    >
                      <Clipboard className="h-4 w-4" />
                    </Button>
                  </Tooltip>
                )}
              </div>
            </div>
            <Divider />
            <div className="flex items-center justify-between">
              <span className="text-sm text-default-500">Order</span>
              <Link
                href={`/admin/transaction/${refund?.order.orderId}`}
                className="text-sm text-primary underline underline-offset-4"
              >
                {refund?.order.orderId}
              </Link>
            </div>
            <Divider />
            <div className="grid grid-cols-2 gap-2">
              <Button
                as={Link}
                href={`/admin/users/${refund?.requester.id}`}
                variant="bordered"
              >
                View User
              </Button>
              <Button
                as={Link}
                href={`/admin/refunds/${refund?.id}/audit`}
                variant="bordered"
              >
                View Audit
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Lines Table */}
      <Card>
        <CardHeader className="flex items-center gap-2">
          <Ticket className="h-5 w-5" />
          <div className="text-base font-semibold">Ticket Lines</div>
        </CardHeader>
        <CardBody>
          <Table
            className="border-none bg-none shadow-none"
            aria-label="Refund ticket lines"
            removeWrapper
            isCompact
          >
            <TableHeader>
              <TableColumn>ORDERITEM ID</TableColumn>
              <TableColumn>EVENT</TableColumn>
              <TableColumn>TICKET</TableColumn>
              <TableColumn className="text-right">QTY</TableColumn>
              <TableColumn className="text-right">AMOUNT</TableColumn>
            </TableHeader>
            <TableBody>
              {(refund?.lines ?? []).map((ln: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-mono text-xs">
                    {ln.orderItemId}
                  </TableCell>
                  <TableCell>{ln.orderItem.event.name}</TableCell>
                  <TableCell>{ln.orderItem.ticket.name}</TableCell>
                  <TableCell className="text-right">{ln.quantity}</TableCell>
                  <TableCell className="text-right">
                    {convertIDR(ln.amount)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} className="text-right font-medium">
                  Total
                </TableCell>
                <TableCell colSpan={1} className="text-right font-medium">
                  {convertIDR(
                    refund?.lines?.reduce(
                      (acc: number, line: any) =>
                        acc + line.amount * line.quantity,
                      0,
                    ),
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default DetailRefund;
