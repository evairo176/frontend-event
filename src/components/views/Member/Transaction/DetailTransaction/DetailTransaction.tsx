import {
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Chip,
  Divider,
  Button,
  Avatar,
  Progress,
} from "@heroui/react";
import React from "react";
import useDetailTransaction from "./useDetailTransaction";
import {
  Calendar,
  MapPin,
  CreditCard,
  Download,
  Share2,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Ticket,
} from "lucide-react";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import { formatDateTime } from "@/utils/date";
import { ITicket } from "@/types/Ticket";
import Link from "next/link";

type Props = {};

const DetailTransaction = (props: Props) => {
  const { dataTransaction } = useDetailTransaction();

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "success";
      case "PENDING":
        return "warning";
      case "FAILED":
        return "danger";
      default:
        return "default";
    }
  };

  // Status icon mapping
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="h-4 w-4" />;
      case "PENDING":
        return <Clock className="h-4 w-4" />;
      case "FAILED":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header Section */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Detail Transaksi
                </h1>
                <p className="text-gray-600">
                  Informasi lengkap pembelian tiket Anda
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="bordered"
                  startContent={<Share2 className="h-4 w-4" />}
                  size="sm"
                >
                  Bagikan
                </Button>
                <Button
                  color="primary"
                  startContent={<Download className="h-4 w-4" />}
                  size="sm"
                >
                  Unduh Tiket
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Transaction Status & Order Info */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Order Information */}
          <Card className="shadow-sm">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800">
                Informasi Pesanan
              </h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Status Pesanan
                </span>
                <Skeleton
                  isLoaded={!!dataTransaction?.status}
                  className="rounded-full"
                >
                  <Chip
                    color={getStatusColor(dataTransaction?.status || "")}
                    variant="flat"
                    startContent={getStatusIcon(dataTransaction?.status || "")}
                  >
                    {dataTransaction?.status}
                  </Chip>
                </Skeleton>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Order ID
                </span>
                <Skeleton
                  isLoaded={!!dataTransaction?.orderId}
                  className="h-4 rounded-md"
                >
                  <span className="font-mono text-sm">
                    {dataTransaction?.orderId}
                  </span>
                </Skeleton>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Total Pembayaran
                </span>
                <Skeleton
                  isLoaded={!!dataTransaction?.total}
                  className="h-5 rounded-md"
                >
                  <span className="text-lg font-bold text-primary">
                    {convertIDR(dataTransaction?.total || 0)}
                  </span>
                </Skeleton>
              </div>

              {dataTransaction?.paymentType && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Metode Pembayaran
                  </span>
                  <Skeleton
                    isLoaded={!!dataTransaction?.paymentType}
                    className="h-4 rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-gray-500" />
                      <span className="text-sm capitalize">
                        {dataTransaction?.paymentType?.replace("_", " ")}
                      </span>
                    </div>
                  </Skeleton>
                </div>
              )}
            </CardBody>
          </Card>

          {/* Payment Progress */}
          <Card className="shadow-sm">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800">
                Status Pembayaran
              </h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress Pembayaran</span>
                  <span>
                    {dataTransaction?.status === "COMPLETED" ? "100%" : "50%"}
                  </span>
                </div>
                <Progress
                  value={dataTransaction?.status === "COMPLETED" ? 100 : 50}
                  color={getStatusColor(dataTransaction?.status || "")}
                  className="max-w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success-100">
                    <CheckCircle className="h-4 w-4 text-success-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Pesanan Dibuat</p>
                    {dataTransaction?.createdAt && (
                      <p className="text-xs text-gray-500">
                        {formatDateTime(dataTransaction?.createdAt)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      dataTransaction?.status === "COMPLETED"
                        ? "bg-success-100"
                        : "bg-gray-100"
                    }`}
                  >
                    <CheckCircle
                      className={`h-4 w-4 ${
                        dataTransaction?.status === "COMPLETED"
                          ? "text-success-600"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Pembayaran Selesai</p>
                    <p className="text-xs text-gray-500">
                      {dataTransaction?.status === "COMPLETED"
                        ? formatDateTime(dataTransaction?.paymentDate)
                        : // ? formatDateTime(dataTransaction?.updatedAt)
                          "Menunggu pembayaran"}
                      {dataTransaction?.payment?.redirect_url &&
                        dataTransaction?.status === "PENDING" && (
                          <Link
                            href={
                              dataTransaction?.payment?.redirect_url as string
                            }
                            className="ml-2 font-semibold text-blue-500"
                          >
                            Bayar Sekarang
                          </Link>
                        )}
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Event Information */}
        {dataTransaction?.items?.[0]?.event && (
          <Card className="shadow-sm">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800">
                Informasi Event
              </h3>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="md:w-1/3">
                  <Skeleton
                    isLoaded={!!dataTransaction?.items?.[0]?.event?.banner}
                    className="aspect-video rounded-lg"
                  >
                    <Image
                      src={dataTransaction?.items?.[0]?.event?.banner || ""}
                      alt={dataTransaction?.items?.[0]?.event?.name || ""}
                      width={400}
                      height={225}
                      className="aspect-video w-full rounded-lg object-cover"
                    />
                  </Skeleton>
                </div>

                <div className="flex-1 space-y-3">
                  <Skeleton
                    isLoaded={!!dataTransaction?.items?.[0]?.event?.name}
                    className="h-6 rounded-md"
                  >
                    <h4 className="text-xl font-bold text-gray-800">
                      {dataTransaction?.items?.[0]?.event?.name}
                    </h4>
                  </Skeleton>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <Skeleton
                        isLoaded={
                          !!dataTransaction?.items?.[0]?.event?.startDate
                        }
                        className="h-4 rounded-md"
                      >
                        {dataTransaction?.items?.[0]?.event?.startDate && (
                          <span className="text-sm">
                            {formatDateTime(
                              dataTransaction?.items?.[0]?.event?.startDate,
                            )}{" "}
                            -{" "}
                            {formatDateTime(
                              dataTransaction?.items?.[0]?.event?.endDate,
                            )}
                          </span>
                        )}
                      </Skeleton>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <Skeleton
                        isLoaded={!!dataTransaction?.items?.[0]?.event?.address}
                        className="h-4 rounded-md"
                      >
                        <span className="text-sm">
                          {dataTransaction?.items?.[0]?.event?.address}
                        </span>
                      </Skeleton>
                    </div>
                  </div>

                  <Skeleton
                    isLoaded={!!dataTransaction?.items?.[0]?.event?.description}
                    className="h-16 rounded-md"
                  >
                    <p className="line-clamp-3 text-sm text-gray-600">
                      {dataTransaction?.items?.[0]?.event?.description}
                    </p>
                  </Skeleton>
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Ticket Details */}
        <Card className="shadow-sm">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-800">
              Detail Tiket
            </h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {dataTransaction?.items?.map((item: any, index: number) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                        <Ticket className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <Skeleton
                          isLoaded={!!item.ticket?.name}
                          className="mb-1 h-5 rounded-md"
                        >
                          <h5 className="font-semibold text-gray-800">
                            {item.ticket?.name}
                          </h5>
                        </Skeleton>
                        <Skeleton
                          isLoaded={!!item.ticket?.description}
                          className="h-4 rounded-md"
                        >
                          <p className="text-sm text-gray-600">
                            {item.ticket?.description}
                          </p>
                        </Skeleton>
                      </div>
                    </div>

                    <div className="text-right">
                      <Skeleton
                        isLoaded={!!item.quantity}
                        className="mb-1 h-4 rounded-md"
                      >
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </Skeleton>
                      <Skeleton
                        isLoaded={!!item.price}
                        className="h-5 rounded-md"
                      >
                        <p className="font-semibold text-primary">
                          {convertIDR(item.price || 0)}
                        </p>
                      </Skeleton>
                    </div>
                  </div>

                  {index < (dataTransaction?.items?.length || 0) - 1 && (
                    <Divider className="mt-4" />
                  )}
                </div>
              ))}

              <Divider />

              {/* Total Summary */}
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                <span className="text-lg font-semibold text-gray-800">
                  Total Pembayaran
                </span>
                <Skeleton
                  isLoaded={!!dataTransaction?.total}
                  className="h-6 rounded-md"
                >
                  <span className="text-xl font-bold text-primary">
                    {convertIDR(dataTransaction?.total || 0)}
                  </span>
                </Skeleton>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Action Buttons */}
        {dataTransaction?.status === "COMPLETED" && (
          <Card className="shadow-sm">
            <CardBody>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button
                  color="primary"
                  size="lg"
                  startContent={<Download className="h-4 w-4" />}
                  className="w-full sm:w-auto"
                >
                  Unduh E-Ticket
                </Button>
                <Button
                  variant="bordered"
                  size="lg"
                  startContent={<Share2 className="h-4 w-4" />}
                  className="w-full sm:w-auto"
                >
                  Bagikan Tiket
                </Button>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DetailTransaction;
