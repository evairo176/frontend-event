import { useState } from "react";
import { addToast, useDisclosure } from "@heroui/react";
import voucherServices from "@/services/voucher.service";

export type TicketData = {
  id: string;
  code: string;
  ticketName: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  price: number;
  holderName: string;
  holderEmail: string;
  status: "valid" | "used" | "expired" | "invalid";
  scannedAt?: string;
  eventBanner?: string;
};

export type LogEntry = {
  id: string;
  timestamp: string;
  type: "info" | "success" | "error" | "warning";
  message: string;
  qrCode?: string;
};

const useCaptureScan = () => {
  // States - Single Scan Mode
  const [isScanning, setIsScanning] = useState(false);
  const [scannedVoucher, setScannedVoucher] = useState<TicketData | null>(null); // Single voucher detail
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [scanLogs, setScanLogs] = useState<LogEntry[]>([]);
  const [showVoucherDetail, setShowVoucherDetail] = useState(false); // Show voucher detail modal
  const [isProcessing, setIsProcessing] = useState(false);

  // Modal for verification confirmation
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Add log entry function
  const addLog = (type: LogEntry["type"], message: string, qrCode?: string) => {
    const logEntry: LogEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      type,
      message,
      qrCode,
    };

    setScanLogs((prev) => [logEntry, ...prev.slice(0, 49)]); // Keep last 50 logs
    console.log(`📝 Log: [${type.toUpperCase()}] ${message}`);
  };

  // Clear logs function
  const clearLogs = () => {
    setScanLogs([]);
  };

  // Verify voucher function
  const verifyVoucher = async (code: string): Promise<TicketData | null> => {
    try {
      const result = await voucherServices.findOneByCode(code);

      console.log("API Response:", result);

      // Check if API response is successful
      if (!result?.data?.success) {
        addToast({
          title: "Error!",
          description: result?.data?.message || "Voucher tidak ditemukan",
          color: "danger",
        });
        return null;
      }

      const voucherData = result.data.data;
      const ticketInfo = voucherData.ticket;
      const eventInfo = ticketInfo.event;

      // Convert voucher data to TicketData format based on API response
      const ticketData: TicketData = {
        id: voucherData.id,
        code: voucherData.code,
        ticketName: ticketInfo.name, // "VIP"
        eventName: eventInfo.name, // "Jakarta Day Event"
        eventDate: eventInfo.startDate, // "2025-08-05 10:58:39"
        eventLocation: eventInfo.address, // "Kulon progo"
        price: ticketInfo.price, // 200000
        holderName: voucherData.orderId, // Using orderId as holder name for now
        holderEmail: "holder@email.com", // Default email since not provided in API
        status: voucherData.isUsed ? "used" : "valid",
        scannedAt: voucherData.isUsed ? voucherData.updatedAt : undefined,
        eventBanner: eventInfo.banner, // Cloudinary image URL
      };

      return ticketData;
    } catch (error: any) {
      console.error("Error verifying voucher:", error);

      // Show appropriate toast based on error type
      if (error.response?.status === 404) {
        addToast({
          title: "Error!",
          description: "Voucher tidak ditemukan",
          color: "danger",
        });
      } else if (error.response?.status === 400) {
        addToast({
          title: "Error!",
          description: "QR Code tidak valid",
          color: "danger",
        });
      } else if (error.response?.status >= 500) {
        addToast({
          title: "Error!",
          description: "Server error. Silakan coba lagi nanti",
          color: "danger",
        });
      } else {
        addToast({
          title: "Error!",
          description: "Gagal memverifikasi voucher. Silakan coba lagi",
          color: "danger",
        });
      }

      return null;
    }
  };

  // Handle QR code scan - Continuous scan mode with duplicate prevention
  const handleScan = async (detectedCodes: any[]) => {
    console.log("🎯 handleScan called with:", detectedCodes);

    if (isProcessing) {
      console.log("🔄 Already processing, ignoring...");
      return;
    }

    // Get the first detected code
    if (detectedCodes.length === 0) {
      console.log("❌ No QR codes detected");
      return;
    }

    console.log("📱 Detected codes structure:", detectedCodes[0]);

    const result =
      detectedCodes[0].rawValue ||
      detectedCodes[0].data ||
      detectedCodes[0].text ||
      detectedCodes[0];

    console.log("🔍 Extracted result:", result);

    if (!result) {
      console.log("❌ No valid QR code data found");
      console.log("Available properties:", Object.keys(detectedCodes[0]));
      return;
    }

    // Prevent duplicate scan of the same voucher that's currently displayed
    if (scannedVoucher && scannedVoucher.code === result) {
      console.log("🔄 Same voucher already displayed, ignoring...");
      return;
    }

    console.log("✅ QR Code scanned:", result);
    addLog(
      "info",
      `QR Code terdeteksi: ${result.substring(0, 20)}${result.length > 20 ? "..." : ""}`,
      result,
    );

    setIsProcessing(true);
    setIsLoading(true);
    // Keep scanner running - camera stays active for continuous scanning

    if (soundEnabled) {
      playBeepSound();
    }

    try {
      const voucherData = await verifyVoucher(result);

      if (voucherData) {
        setScannedVoucher(voucherData);
        setShowVoucherDetail(true);
        addLog(
          "success",
          `Voucher berhasil diverifikasi: ${voucherData.holderName}`,
          result,
        );

        addToast({
          title: "Success!",
          description: `Voucher berhasil diverifikasi: ${voucherData.holderName}`,
          color: "success",
        });
      } else {
        addLog("error", "Verifikasi voucher gagal", result);
      }
    } catch (error) {
      console.error("❌ Unexpected error during verification:", error);
      addLog(
        "error",
        `Kesalahan tidak terduga: ${error instanceof Error ? error.message : "Unknown error"}`,
        result,
      );
    } finally {
      setIsLoading(false);
      setIsProcessing(false); // Reset immediately to allow next scan
    }
  };

  // Handle scan error
  const handleError = (error: unknown) => {
    console.error("Scanner error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    addLog("error", `Scanner error: ${errorMessage}`);
  };

  // Start scanning
  const startScanning = () => {
    setIsScanning(true);
    setError(null);
    setScannedVoucher(null);
    setShowVoucherDetail(false);
    addLog("info", "Memulai scanner...");
  };

  // Stop scanning
  const stopScanning = () => {
    setIsScanning(false);
    addLog("info", "Scanner dihentikan");
  };

  // Verify voucher (confirm verification)
  const confirmVerification = async () => {
    if (!scannedVoucher) return;

    setIsLoading(true);
    try {
      // TODO: Call API to mark voucher as used
      // await voucherServices.markAsUsed(scannedVoucher.code);

      // Update local state
      setScannedVoucher((prev) =>
        prev
          ? { ...prev, status: "used", scannedAt: new Date().toISOString() }
          : null,
      );

      addToast({
        title: "Success!",
        description:
          "Voucher berhasil diverifikasi dan ditandai sebagai digunakan",
        color: "success",
      });

      addLog("success", `Voucher ${scannedVoucher.code} berhasil diverifikasi`);
      onClose();
    } catch (error) {
      console.error("Error confirming verification:", error);
      addToast({
        title: "Error!",
        description: "Gagal memverifikasi voucher",
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel verification
  const cancelVerification = () => {
    setScannedVoucher(null);
    setShowVoucherDetail(false);
    addLog("info", "Verifikasi dibatalkan");
    onClose();
  };

  // Reset scanner for new scan
  const resetScanner = () => {
    setScannedVoucher(null);
    setShowVoucherDetail(false);
    setError(null);
    addLog("info", "Scanner direset untuk scan baru");
  };

  // Play beep sound
  const playBeepSound = () => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = "square";

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.1,
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      console.warn("Could not play beep sound:", error);
    }
  };

  // Get status color and icon
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "valid":
        return {
          color: "success",
          icon: "CheckCircle",
          text: "Valid",
          bgColor: "bg-green-50",
        };
      case "used":
        return {
          color: "warning",
          icon: "AlertTriangle",
          text: "Sudah Digunakan",
          bgColor: "bg-yellow-50",
        };
      case "expired":
        return {
          color: "danger",
          icon: "XCircle",
          text: "Kadaluarsa",
          bgColor: "bg-red-50",
        };
      case "invalid":
        return {
          color: "danger",
          icon: "XCircle",
          text: "Tidak Valid",
          bgColor: "bg-red-50",
        };
      default:
        return {
          color: "default",
          icon: "AlertTriangle",
          text: "Unknown",
          bgColor: "bg-gray-50",
        };
    }
  };

  return {
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
    addLog,
    clearLogs,
    getStatusInfo,

    // Setters
    setSoundEnabled,
  };
};

export default useCaptureScan;
