import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import useActivatedUserRadio from "./useActivatedUserRadio";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchUser: () => void;
  setSelectedId: Dispatch<SetStateAction<string>>;
  selectedId: string;
  defaultValue: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  userName?: string;
  actionType?: "activate" | "deactivate";
  onOpen: () => void;
};

const ActivatedUserRadio = ({
  isOpen = false,
  onClose,
  refetchUser,
  onOpenChange,
  selectedId,
  setSelectedId,
  defaultValue,
  title,
  description,
  confirmText,
  cancelText,
  userName,
  actionType,
  onOpen,
}: Props) => {
  const {
    isPendingUpdateActivate,
    isSuccessUpdateActivate,
    mutateUpdateActivate,
  } = useActivatedUserRadio();
  useEffect(() => {
    if (isSuccessUpdateActivate) {
      onClose();
      refetchUser();
    }
  }, [isSuccessUpdateActivate]);

  console.log();

  // Handle confirmation
  const handleConfirm = () => {
    try {
      const payload = {
        userId: selectedId,
        value: !defaultValue,
      };
      mutateUpdateActivate(payload);
    } catch (error) {
      console.error("Error updating switch value:", error);
      // Keep the switch in its current state if error occurs
    }
  };

  // Generate dynamic content based on action type and pending value
  const getModalContent = () => {
    const isActivating = !defaultValue;
    const action = isActivating ? "mengaktifkan" : "menonaktifkan";
    const actionPast = isActivating ? "diaktifkan" : "dinonaktifkan";

    return {
      title: title || `Konfirmasi ${isActivating ? "Aktivasi" : "Deaktivasi"}`,
      description:
        description ||
        `Apakah Anda yakin ingin ${action} ${userName ? `user "${userName}"` : "item ini"}?`,
      icon: isActivating ? CheckCircle : XCircle,
      iconColor: isActivating ? "text-green-500" : "text-red-500",
      iconBg: isActivating ? "bg-green-100" : "bg-red-100",
      confirmButtonColor: isActivating ? "success" : "danger",
      confirmButtonText: confirmText,
      warningText: isActivating
        ? `User akan ${actionPast} dan dapat mengakses sistem.`
        : `User akan ${actionPast} dan tidak dapat mengakses sistem.`,
    };
  };

  const modalContent = getModalContent();
  const ModalIcon = modalContent.icon;

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
            <div className={`rounded-full p-2 ${modalContent.iconBg}`}>
              <ModalIcon className={`h-5 w-5 ${modalContent.iconColor}`} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              {modalContent.title}
            </h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <div className="space-y-4">
            <p className="text-gray-600">{modalContent.description}</p>

            {modalContent.warningText && (
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-600" />
                  <p className="text-sm text-yellow-800">
                    {modalContent.warningText}
                  </p>
                </div>
              </div>
            )}

            {userName && (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Target User:
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {userName}
                  </span>
                </div>
              </div>
            )}
          </div>
        </ModalBody>

        <ModalFooter>
          <div className="flex w-full gap-2 sm:w-auto sm:justify-end">
            <Button
              variant="bordered"
              onPress={onClose}
              className="flex-1 sm:flex-none"
              disabled={isPendingUpdateActivate}
            >
              {cancelText}
            </Button>
            <Button
              color={modalContent.confirmButtonColor as any}
              onPress={handleConfirm}
              className="flex-1 sm:flex-none"
              isLoading={isPendingUpdateActivate}
              startContent={
                !isPendingUpdateActivate ? (
                  <ModalIcon className="h-4 w-4" />
                ) : undefined
              }
            >
              {modalContent.confirmButtonText}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ActivatedUserRadio;
