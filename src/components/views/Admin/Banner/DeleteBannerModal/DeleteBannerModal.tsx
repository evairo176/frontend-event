import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteBannerModal from "./useDeleteBannerModal";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchBanner: () => void;
  setSelectedId: Dispatch<SetStateAction<string>>;
  selectedId: string;
};

const DeleteBannerModal = ({
  isOpen = false,
  onClose,
  refetchBanner,
  onOpenChange,
  selectedId,
  setSelectedId,
}: Props) => {
  const {
    mutateDeleteCatgeory,
    isPendingMutateDeleteBanner,
    isSuccessMutateDeleteBanner,
  } = useDeleteBannerModal();
  useEffect(() => {
    if (isSuccessMutateDeleteBanner) {
      onClose();
      refetchBanner();
    }
  }, [isSuccessMutateDeleteBanner]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Banner</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure wyou want to delete this banner?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingMutateDeleteBanner}
          >
            Cancel
          </Button>
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 font-medium"
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteBanner}
            onPress={() => {
              mutateDeleteCatgeory(selectedId);
            }}
          >
            {isPendingMutateDeleteBanner ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete banner"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteBannerModal;
