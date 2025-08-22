import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@heroui/react";
import React, { useEffect } from "react";

import { AlertTriangle, Check, X } from "lucide-react";
import useActionStatusModal from "./useActionStatusModal";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  refetchRefund: () => void;
  selectedId: string;
  confirmText?: string;
  cancelText?: string;
  actionType?: "activate" | "deactivate";
  onOpen: () => void;
};

const ActionStatusModal = ({
  isOpen = false,
  onClose,
  refetchRefund,
  selectedId,
  cancelText,
}: Props) => {
  const {
    isPendingActionStatus,
    isSuccessActionStatus,
    adminNote,
    setAdminNote,
    mutateActionStatus,
  } = useActionStatusModal();
  useEffect(() => {
    if (isSuccessActionStatus) {
      onClose();
      refetchRefund();
    }
  }, [isSuccessActionStatus]);

  useEffect(() => {
    setAdminNote("");
  }, [isOpen]);

  // Handle confirmation
  const handleConfirm = () => {
    try {
      const payload = {
        refundId: selectedId,
        adminNote,
      };
      mutateActionStatus(payload);
    } catch (error) {
      console.error("Error updating switch value:", error);
      // Keep the switch in its current state if error occurs
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      backdrop="opaque"
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className={`rounded-full p-2`}>
              <AlertTriangle className={`h-5 w-5 text-yellow-400`} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Konfirmasi Status Refund
            </h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <div className="space-y-4">
            <p className="text-gray-600">
              Apakah Anda yakin ingin merefund user "erlangga"?
            </p>

            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-600" />
                <p className="text-sm text-yellow-800">
                  User akan dinonaktifkan dan tidak dapat mengakses sistem.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Target User:
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  erlangga
                </span>
              </div>
            </div>

            <div>
              <Textarea
                label="Alasan Refund (Opsional)"
                labelPlacement="outside"
                placeholder="Enter your description"
                value={adminNote}
                variant="underlined"
                onValueChange={setAdminNote}
                isClearable
              />
            </div>
          </div>
        </ModalBody>

        <ModalFooter className="w-full">
          <div className="flex w-full items-center lg:justify-between">
            <div>
              <Button
                variant="bordered"
                onPress={onClose}
                className="flex-1 sm:flex-none"
                disabled={isPendingActionStatus}
              >
                {cancelText}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                color="danger"
                className="flex-1 sm:flex-none"
                isLoading={isPendingActionStatus}
                startContent={<X className="h-4 w-4" />}
              >
                Reject
              </Button>
              <Button
                color="success"
                onPress={handleConfirm}
                className="flex-1 sm:flex-none"
                isLoading={isPendingActionStatus}
                startContent={<Check className="h-4 w-4" />}
              >
                Approve
              </Button>
            </div>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ActionStatusModal;
