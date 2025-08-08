import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Divider,
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import {
  Camera,
  CameraOff,
  Scan,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Calendar,
  MapPin,
  Ticket,
  RefreshCw,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { convertIDR } from "@/utils/currency";
import { formatDateTime } from "@/utils/date";
import useCaptureScan, { type TicketData } from "./useCaptureScan";

type Props = {};

const CaptureScan = (props: Props) => {
  // Use the custom hook for single scan logic
  const {
    // States
    isScanning,
    scannedVoucher,
    isLoading,
    error,
    soundEnabled,
    scanLogs,
    showVoucherDetail,
    isProcessing,

    // Modal
    isOpen,
    onOpen,
    onClose,

    // Functions
    handleScan,
    handleError,
    startScanning,
    stopScanning,
    confirmVerification,
    cancelVerification,
    resetScanner,
    clearLogs,
    getStatusInfo,

    // Setters
    setSoundEnabled,
  } = useCaptureScan();

  // Get status info for current scanned voucher
  const statusInfo = scannedVoucher
    ? getStatusInfo(scannedVoucher.status)
    : null;
  const StatusIcon =
    statusInfo?.icon === "CheckCircle"
      ? CheckCircle
      : statusInfo?.icon === "XCircle"
        ? XCircle
        : statusInfo?.icon === "AlertTriangle"
          ? AlertTriangle
          : AlertTriangle;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Scanner Voucher</h1>
          <p className="text-gray-600">Scan QR code voucher untuk verifikasi</p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[70%_30%]">
          {/* Left Side - Camera Scanner (70%) */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Scan className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Scanner QR Code</h2>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="flat"
                    isIconOnly
                    onPress={() => setSoundEnabled(!soundEnabled)}
                    color={soundEnabled ? "primary" : "default"}
                  >
                    {soundEnabled ? (
                      <Volume2 className="h-4 w-4" />
                    ) : (
                      <VolumeX className="h-4 w-4" />
                    )}
                  </Button>

                  <div className="flex gap-2">
                    {!isScanning ? (
                      <Button
                        color="primary"
                        startContent={<Camera className="h-4 w-4" />}
                        onPress={startScanning}
                        disabled={isProcessing}
                      >
                        Mulai Scan
                      </Button>
                    ) : (
                      <Button
                        color="danger"
                        variant="flat"
                        startContent={<CameraOff className="h-4 w-4" />}
                        onPress={stopScanning}
                      >
                        Stop Scan
                      </Button>
                    )}

                    {/* Reset Button */}
                    <Button
                      variant="bordered"
                      size="sm"
                      startContent={<RefreshCw className="h-4 w-4" />}
                      onPress={resetScanner}
                    >
                      Reset
                    </Button>

                    {/* Test Button for Debugging */}
                    <Button
                      variant="bordered"
                      size="sm"
                      onPress={() => {
                        // Simulate QR code scan for testing
                        const testQRCode = `TEST-${Date.now()}`;
                        console.log("🧪 Testing with QR code:", testQRCode);
                        // Simulate detected codes array format
                        const mockDetectedCodes = [
                          { rawValue: testQRCode, data: testQRCode },
                        ];
                        handleScan(mockDetectedCodes);
                      }}
                    >
                      Test Scan
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardBody>
              <div className="relative">
                {/* Camera Scanner Area */}
                <div className="flex h-[400px] items-center justify-center overflow-hidden rounded-lg bg-black">
                  {!isScanning ? (
                    <div className="text-center text-white">
                      <Camera className="mx-auto mb-4 h-12 w-12" />
                      <h3 className="mb-2 text-lg font-semibold">
                        Scanner Siap
                      </h3>
                      <p className="text-sm opacity-80">
                        Klik "Mulai Scan" untuk mengaktifkan kamera
                      </p>
                    </div>
                  ) : (
                    <div className="relative h-full w-full">
                      <Scanner
                        onScan={handleScan}
                        onError={handleError}
                        constraints={{
                          facingMode: "environment",
                        }}
                        styles={{
                          container: {
                            width: "100%",
                            height: "100%",
                          },
                          video: {
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          },
                        }}
                      />

                      {/* Scanning Overlay */}
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="flex h-64 w-64 items-center justify-center rounded-lg border-2 border-dashed border-white">
                          <div className="text-center text-white">
                            <Scan className="mx-auto mb-2 h-8 w-8" />
                            <p className="text-sm">
                              Arahkan QR code ke area ini
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Loading Overlay - Fixed to match video dimensions */}
                {isLoading && (
                  <div className="absolute left-0 top-0 z-10 flex h-[400px] w-full items-center justify-center rounded-lg bg-black/50">
                    <div className="text-center text-white">
                      <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
                      <p>Memverifikasi voucher...</p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                      <div>
                        <h4 className="font-medium text-red-800">Error</h4>
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Terminal Log */}
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-700">
                      Scanner Log
                    </h3>
                    {scanLogs.length > 0 && (
                      <Button
                        size="sm"
                        variant="flat"
                        onPress={clearLogs}
                        className="text-xs"
                      >
                        Clear Log
                      </Button>
                    )}
                  </div>

                  <div className="max-h-48 overflow-y-auto rounded-lg bg-gray-900 p-3 font-mono text-xs text-green-400">
                    {scanLogs.length === 0 ? (
                      <div className="py-4 text-center text-gray-500">
                        Log akan muncul di sini ketika scanner digunakan...
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {scanLogs.map((log) => (
                          <div key={log.id} className="flex items-start gap-2">
                            <span className="flex-shrink-0 text-gray-400">
                              [{log.timestamp}]
                            </span>
                            <span
                              className={`flex-shrink-0 ${
                                log.type === "success"
                                  ? "text-green-400"
                                  : log.type === "error"
                                    ? "text-red-400"
                                    : log.type === "warning"
                                      ? "text-yellow-400"
                                      : "text-blue-400"
                              }`}
                            >
                              {log.type === "success"
                                ? "✓"
                                : log.type === "error"
                                  ? "✗"
                                  : log.type === "warning"
                                    ? "⚠"
                                    : "ℹ"}
                            </span>
                            <span className="flex-1 break-words">
                              {log.message}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Right Side - Voucher Details (30%) */}
          <div className="space-y-6">
            {/* Current Scanned Voucher */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Ticket className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Detail Voucher</h2>
                </div>
              </CardHeader>

              <CardBody>
                {scannedVoucher ? (
                  <div className="space-y-4">
                    {/* Status Badge */}
                    <div className={`rounded-lg p-3 ${statusInfo?.bgColor}`}>
                      <div className="flex items-center gap-2">
                        {StatusIcon && (
                          <StatusIcon
                            className={`h-5 w-5 text-${statusInfo?.color}-600`}
                          />
                        )}
                        <Chip
                          color={statusInfo?.color as any}
                          variant="flat"
                          size="sm"
                        >
                          {statusInfo?.text}
                        </Chip>
                      </div>
                    </div>

                    {/* Event Banner */}
                    {scannedVoucher.eventBanner && (
                      <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={scannedVoucher.eventBanner}
                          alt={scannedVoucher.eventName}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.parentElement!.innerHTML = `
                              <div class="flex h-full items-center justify-center bg-gray-100">
                                <div class="text-center">
                                  <div class="mx-auto mb-2 h-8 w-8 text-gray-400">
                                    <svg fill="currentColor" viewBox="0 0 20 20">
                                      <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                    </svg>
                                  </div>
                                  <p class="text-xs text-gray-500">Gambar tidak dapat dimuat</p>
                                </div>
                              </div>
                            `;
                          }}
                        />
                      </div>
                    )}

                    {/* Voucher Info */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="line-clamp-2 font-semibold text-gray-800">
                          {scannedVoucher.eventName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {scannedVoucher.ticketName}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {formatDateTime(scannedVoucher.eventDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span className="line-clamp-2">
                            {scannedVoucher.eventLocation}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User className="h-4 w-4" />
                          <span>{scannedVoucher.holderName}</span>
                        </div>
                      </div>

                      <Divider />

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Harga Voucher
                        </span>
                        <span className="font-semibold text-primary">
                          {convertIDR(scannedVoucher.price)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Kode Voucher
                        </span>
                        <code className="rounded bg-gray-100 px-2 py-1 font-mono text-xs">
                          {scannedVoucher.code}
                        </code>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {scannedVoucher.status === "valid" && (
                      <div className="flex gap-2 pt-4">
                        <Button
                          color="success"
                          className="flex-1"
                          startContent={<CheckCircle className="h-4 w-4" />}
                          onPress={onOpen}
                          isLoading={isLoading}
                        >
                          Verifikasi
                        </Button>
                        <Button
                          color="danger"
                          variant="flat"
                          className="flex-1"
                          startContent={<XCircle className="h-4 w-4" />}
                          onPress={cancelVerification}
                        >
                          Batal
                        </Button>
                      </div>
                    )}

                    {scannedVoucher.scannedAt && (
                      <div className="rounded-lg bg-blue-50 p-3">
                        <p className="text-xs text-blue-700">
                          Diverifikasi pada:{" "}
                          {formatDateTime(scannedVoucher.scannedAt)}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <Ticket className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                    <h3 className="mb-2 font-medium text-gray-800">
                      Belum Ada Voucher
                    </h3>
                    <p className="text-sm text-gray-600">
                      Scan QR code voucher untuk melihat detail
                    </p>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Verification Confirmation Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="md">
          <ModalContent>
            <ModalHeader>
              <h3 className="text-lg font-semibold">Konfirmasi Verifikasi</h3>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Apakah Anda yakin ingin memverifikasi voucher ini?
                </p>

                {scannedVoucher && (
                  <div className="rounded-lg bg-gray-50 p-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={scannedVoucher.holderName} size="sm" />
                      <div>
                        <p className="font-medium">
                          {scannedVoucher.holderName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {scannedVoucher.ticketName}
                        </p>
                        <p className="text-sm font-medium text-primary">
                          {convertIDR(scannedVoucher.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="bordered" onPress={onClose} disabled={isLoading}>
                Batal
              </Button>
              <Button
                color="success"
                onPress={confirmVerification}
                isLoading={isLoading}
              >
                Verifikasi
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default CaptureScan;
