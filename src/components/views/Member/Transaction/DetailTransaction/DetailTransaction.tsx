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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/react";
import React, { useState } from "react";
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
  QrCode,
  Eye,
  Copy,
} from "lucide-react";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import { formatDateTime } from "@/utils/date";
import { ITicket } from "@/types/Ticket";
import Link from "next/link";
import { div } from "framer-motion/client";

type Props = {};

const DetailTransaction = (props: Props) => {
  const { dataTransaction } = useDetailTransaction();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedVouchers, setSelectedVouchers] = useState<any[]>([]);
  const [selectedTicketName, setSelectedTicketName] = useState<string>("");

  // Function to generate QR code data URL
  const generateQRCode = (text: string) => {
    // Simple QR code generation using a service or library
    // For now, we'll use a placeholder. In production, you'd use a proper QR library
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
  };

  // Function to copy voucher code to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You can add a toast notification here
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Function to download single QR code
  const downloadSingleQR = async (
    voucher: any,
    ticketName: string,
    index: number,
  ) => {
    try {
      const qrUrl = generateQRCode(voucher.code);
      const response = await fetch(qrUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${ticketName}_Tiket_${index + 1}_${voucher.code.substring(0, 8)}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading QR code:", error);
    }
  };

  // Function to download all QR codes for current ticket type
  const downloadCurrentTicketQRs = async () => {
    try {
      for (let i = 0; i < selectedVouchers.length; i++) {
        const voucher = selectedVouchers[i];
        await downloadSingleQR(voucher, selectedTicketName, i);
        // Add delay to prevent overwhelming the browser
        if (i < selectedVouchers.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
    } catch (error) {
      console.error("Error downloading current ticket QRs:", error);
    }
  };

  // Function to download all QR codes from all tickets
  const downloadAllQRCodes = async () => {
    try {
      if (!dataTransaction?.items) return;

      for (const item of dataTransaction.items) {
        if (item.ticket?.vouchers && item.ticket.vouchers.length > 0) {
          for (let i = 0; i < item.ticket.vouchers.length; i++) {
            const voucher = item.ticket.vouchers[i];
            await downloadSingleQR(voucher, item.ticket.name, i);
            // Add delay between downloads
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
        }
      }
    } catch (error) {
      console.error("Error downloading all QR codes:", error);
    }
  };

  // Function to create and download combined image with all QR codes
  const downloadQRCodesImage = async (vouchers: any[], ticketName: string) => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      // Calculate canvas dimensions
      const qrSize = 200;
      const padding = 20;
      const cols = Math.min(vouchers.length, 3); // Max 3 columns
      const rows = Math.ceil(vouchers.length / cols);

      const canvasWidth = cols * qrSize + (cols + 1) * padding;
      const canvasHeight = rows * qrSize + (rows + 1) * padding + 100; // Extra space for header

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Set white background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Add header
      ctx.fillStyle = "black";
      ctx.font = "bold 20px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`${ticketName} - QR Codes`, canvasWidth / 2, 30);

      ctx.font = "14px Arial";
      ctx.fillText(
        `${dataTransaction?.items?.[0]?.event?.name || "Event"}`,
        canvasWidth / 2,
        55,
      );
      ctx.fillText(
        `Order: ${dataTransaction?.orderId || ""}`,
        canvasWidth / 2,
        75,
      );

      // Load and draw QR codes
      const promises = vouchers.map(async (voucher, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);

        const x = padding + col * (qrSize + padding);
        const y = 100 + padding + row * (qrSize + padding);

        return new Promise<void>((resolve, reject) => {
          const img = document.createElement("img") as HTMLImageElement;
          img.crossOrigin = "anonymous";

          img.onload = () => {
            // Draw QR code
            ctx.drawImage(img, x, y, qrSize, qrSize);

            // Add voucher code below QR
            ctx.font = "12px monospace";
            ctx.textAlign = "center";
            ctx.fillStyle = "black";
            ctx.fillText(voucher.code, x + qrSize / 2, y + qrSize + 20);

            // Add ticket number
            ctx.font = "10px Arial";
            ctx.fillText(
              `Tiket #${index + 1}`,
              x + qrSize / 2,
              y + qrSize + 35,
            );

            resolve();
          };

          img.onerror = () =>
            reject(new Error(`Failed to load QR code ${index + 1}`));
          img.src = generateQRCode(voucher.code);
        });
      });

      await Promise.all(promises);

      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${ticketName}_QR_Codes_${new Date().getTime()}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        }
      }, "image/png");
    } catch (error) {
      console.error("Error creating combined image:", error);
    }
  };

  // Function to open voucher modal
  const openVoucherModal = (vouchers: any[], ticketName: string) => {
    setSelectedVouchers(vouchers);
    setSelectedTicketName(ticketName);
    onOpen();
  };

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
                  {/* Show QR Code Button for Completed Orders */}
                  {dataTransaction?.status === "COMPLETED" &&
                    item.ticket?.vouchers &&
                    item.ticket.vouchers.length > 0 && (
                      <div className="mt-4 flex justify-center">
                        <Button
                          size="md"
                          variant="flat"
                          fullWidth
                          color="primary"
                          startContent={<QrCode className="h-4 w-4" />}
                          onPress={() =>
                            openVoucherModal(
                              item.ticket.vouchers,
                              item.ticket.name,
                            )
                          }
                        >
                          Lihat QR Code Tiket ({item.ticket.vouchers.length})
                        </Button>
                      </div>
                    )}
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
              <div className="space-y-4">
                {/* Main Action Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button
                    color="primary"
                    size="lg"
                    startContent={<Download className="h-4 w-4" />}
                    onClick={downloadAllQRCodes}
                    className="w-full sm:w-auto"
                  >
                    Unduh Semua QR Code
                  </Button>
                  <Button
                    variant="bordered"
                    color="primary"
                    size="lg"
                    startContent={<Share2 className="h-4 w-4" />}
                    className="w-full sm:w-auto"
                  >
                    Bagikan Tiket
                  </Button>
                </div>

                {/* Download Summary */}
                <div className="rounded-lg bg-blue-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">
                        Total QR Code Tersedia
                      </h4>
                      <p className="text-xs text-blue-600">
                        Semua tiket siap untuk diunduh
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-blue-800">
                        {dataTransaction?.items?.reduce(
                          (total: number, item: any) =>
                            total + (item.ticket?.vouchers?.length || 0),
                          0,
                        )}{" "}
                        QR Code
                      </span>
                      <p className="text-xs text-blue-600">
                        dari {dataTransaction?.items?.length} jenis tiket
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {/* QR Code Modal */}
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size="2xl"
          scrollBehavior="inside"
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="text-xl font-bold">QR Code Tiket</h3>
              <p className="text-sm text-gray-600">
                {selectedTicketName} - {selectedVouchers.length} Tiket
              </p>
            </ModalHeader>
            <ModalBody className="pb-6">
              <div className="space-y-6">
                {selectedVouchers.map((voucher, index) => (
                  <div
                    key={voucher.id}
                    className="rounded-lg border border-gray-200 p-4"
                  >
                    <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
                      {/* QR Code */}
                      <div className="flex flex-col items-center">
                        <div className="rounded-lg border-2 border-gray-200 p-4">
                          <Image
                            src={generateQRCode(voucher.code)}
                            alt={`QR Code for ${voucher.code}`}
                            width={150}
                            height={150}
                            className="h-[150px] w-[150px]"
                          />
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                          Tiket #{index + 1}
                        </p>
                      </div>

                      {/* Voucher Details */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            Kode Voucher
                          </h4>
                          <div className="mt-1 flex items-center gap-2">
                            <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">
                              {voucher.code}
                            </code>
                            <Button
                              size="sm"
                              variant="light"
                              isIconOnly
                              onClick={() => copyToClipboard(voucher.code)}
                              className="h-8 w-8"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Status:
                            </span>
                            <Chip
                              size="sm"
                              color={voucher.isUsed ? "danger" : "success"}
                              variant="flat"
                            >
                              {voucher.isUsed
                                ? "Sudah Digunakan"
                                : "Belum Digunakan"}
                            </Chip>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Dibuat:
                            </span>
                            <span className="text-sm">
                              {formatDateTime(voucher.createdAt)}
                            </span>
                          </div>
                          {voucher.isUsed && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">
                                Digunakan:
                              </span>
                              <span className="text-sm">
                                {voucher.ticketScanHistory?.length > 0 &&
                                  formatDateTime(
                                    voucher.ticketScanHistory[0]?.createdAt,
                                  )}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Download Individual QR Code */}
                        <div className="mt-3">
                          <Button
                            size="sm"
                            variant="bordered"
                            color="primary"
                            startContent={<Download className="h-3 w-3" />}
                            onClick={() =>
                              downloadSingleQR(
                                voucher,
                                selectedTicketName,
                                index,
                              )
                            }
                            className="w-full"
                          >
                            Unduh QR Code #{index + 1}
                          </Button>
                        </div>

                        {/* Instructions */}
                        <div className="rounded-lg bg-blue-50 p-3">
                          <h5 className="mb-1 text-sm font-medium text-blue-800">
                            Cara Penggunaan:
                          </h5>
                          <ul className="space-y-1 text-xs text-blue-700">
                            <li>• Tunjukkan QR code ini saat masuk event</li>
                            <li>
                              • Pastikan QR code dapat dipindai dengan jelas
                            </li>
                            <li>• Simpan screenshot sebagai backup</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Divider between vouchers */}
                    {index < selectedVouchers.length - 1 && (
                      <Divider className="mt-4" />
                    )}
                  </div>
                ))}

                {/* Download All Buttons */}
                <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-center">
                  <Button
                    color="primary"
                    size="lg"
                    startContent={<Download className="h-4 w-4" />}
                    onClick={() =>
                      downloadQRCodesImage(selectedVouchers, selectedTicketName)
                    }
                    className="w-full sm:w-auto"
                  >
                    Unduh Semua QR ({selectedTicketName})
                  </Button>
                  <Button
                    variant="bordered"
                    color="primary"
                    size="lg"
                    startContent={<Download className="h-4 w-4" />}
                    onClick={downloadCurrentTicketQRs}
                    className="w-full sm:w-auto"
                  >
                    Unduh Satu per Satu
                  </Button>
                </div>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default DetailTransaction;
