import { useState } from "react";
import { addToast, useDisclosure } from "@heroui/react";
import voucherServices from "@/services/voucher.service";
import { useLogger } from "@/hooks/useLogger";
import { useMutation } from "@tanstack/react-query";
import { errorCallback, successCallback } from "@/utils/tanstack-callback";

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

// Removed duplicate LogEntry type - using the one from useLogger

const useCaptureScan = () => {
  // States - Single Scan Mode
  const [isScanning, setIsScanning] = useState(false);
  const [scannedVoucher, setScannedVoucher] = useState<TicketData | null>(null); // Single voucher detail
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showVoucherDetail, setShowVoucherDetail] = useState(false); // Show voucher detail modal
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentVoucherCode, setCurrentVoucherCode] = useState<string | null>(
    null,
  );
  const [autoVerifyEnabled, setAutoVerifyEnabled] = useState(false);
  const [autoConfirmError, setAutoConfirmError] = useState<string | null>(null);

  // Modal for verification confirmation
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Use the new logger hook
  const {
    logs: scanLogs,
    addLog,
    clearLogs,
    getLogsByLevel,
    getLogStats,
  } = useLogger({
    context: "VoucherScanner",
    maxLogs: 50,
  });

  // TanStack Query: Verify voucher mutation
  const verifyVoucherMutation = useMutation({
    mutationFn: async (code: string) => {
      // Use direct API call that throws error on failure
      const response = await voucherServices.findOneByCode(code);
      return response;
    },
    onSuccess: (response, code) => {
      console.log("Verify voucher success:", response);

      const message = successCallback(response);
      const voucherData = response.data.data || response.data;

      // Validate that we have the required data structure
      if (!voucherData || !voucherData.ticket) {
        addToast({
          title: "Error!",
          description: "Format data voucher tidak valid",
          color: "danger",
        });
        return;
      }

      const ticketInfo = voucherData.ticket;
      const eventInfo = ticketInfo.event;

      // Convert voucher data to TicketData format
      const ticketData: TicketData = {
        id: voucherData.id,
        code: voucherData.code,
        ticketName: ticketInfo.name,
        eventName: eventInfo.name,
        eventDate: eventInfo.startDate,
        eventLocation: eventInfo.address,
        price: ticketInfo.price,
        holderName: voucherData.orderId,
        holderEmail: "holder@email.com",
        status: voucherData.isUsed ? "used" : "valid",
        scannedAt: voucherData.isUsed ? voucherData.updatedAt : undefined,
        eventBanner: eventInfo.banner,
      };

      setScannedVoucher(ticketData);
      setShowVoucherDetail(true);

      addLog(
        "success",
        `Voucher berhasil diverifikasi: ${ticketData.holderName}`,
        { qrCode: code },
      );

      addToast({
        title: "Success!",
        description: `Voucher berhasil diverifikasi: ${ticketData.holderName}`,
        color: "success",
      });

      // Auto verify if enabled and voucher is valid
      if (autoVerifyEnabled && ticketData.status === "valid") {
        addLog("info", "Auto verify enabled - langsung konfirmasi voucher", {
          qrCode: code,
        });
        // Trigger confirm verification automatically
        setTimeout(() => {
          confirmVerificationMutation.mutate({ code: ticketData.code });
        }, 1000); // Small delay to show the voucher details first
      }
    },
    onError: (error: any, code) => {
      console.error("Verify voucher error:", error);

      const { message } = errorCallback(error);

      addToast({
        title: "Error!",
        description: message,
        color: "danger",
      });

      addLog("error", `Verifikasi voucher gagal: ${message}`, { qrCode: code });
    },
    onSettled: () => {
      setIsLoading(false);
      setIsProcessing(false);
    },
  });

  // Handle QR code scan - using TanStack Query mutation
  const handleScan = async (detectedCodes: any[]) => {
    console.log("🎯 handleScan called with:", detectedCodes);

    if (verifyVoucherMutation.isPending) {
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
      { qrCode: result },
    );

    // Reset auto confirm error when scanning new voucher
    setAutoConfirmError(null);

    setIsProcessing(true);
    setIsLoading(true);

    if (soundEnabled) {
      playBeepSound();
    }

    // Use TanStack Query mutation to verify voucher
    verifyVoucherMutation.mutate(result);
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

  // TanStack Query: Confirm verification mutation
  const confirmVerificationMutation = useMutation({
    mutationFn: async (payload: { code: string }) => {
      // Use direct API call that throws error on failure
      const response = await voucherServices.verifyScanVoucher(payload);
      return response;
    },
    onSuccess: (response) => {
      console.log("Confirm verification success:", response);

      const message = successCallback(response);

      // Update local state
      setScannedVoucher((prev) =>
        prev
          ? { ...prev, status: "used", scannedAt: new Date().toISOString() }
          : null,
      );

      addToast({
        title: "Success!",
        description:
          message ||
          "Voucher berhasil diverifikasi dan ditandai sebagai digunakan",
        color: "success",
      });

      addLog(
        "success",
        `Voucher ${scannedVoucher?.code} berhasil diverifikasi`,
      );
      onClose();
    },
    onError: (error: any) => {
      console.error("Confirm verification error:", error);

      const { message } = errorCallback(error);

      // Store auto confirm error for display in UI
      setAutoConfirmError(message);

      // Update voucher status to show error state
      setScannedVoucher((prev) =>
        prev ? { ...prev, status: "invalid" as const } : null,
      );

      addToast({
        title: "Error!",
        description: message,
        color: "danger",
      });

      addLog("error", `Gagal memverifikasi voucher: ${message}`);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  // Confirm verification function using TanStack Query
  const confirmVerification = () => {
    if (!scannedVoucher) return;

    setIsLoading(true);
    confirmVerificationMutation.mutate({ code: scannedVoucher.code });
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
    isConfirmingVerification: confirmVerificationMutation.isPending,

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
    autoVerifyEnabled,
    setAutoVerifyEnabled,
    autoConfirmError,
  };
};

export default useCaptureScan;
