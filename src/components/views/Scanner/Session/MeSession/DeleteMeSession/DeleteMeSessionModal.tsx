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
import useDeleteMeSessionModal from "./useDeleteMeSessionModal";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchSession: () => void;
  setSelectedId: Dispatch<SetStateAction<string>>;
  selectedId: string;
};

const DeleteMeSessionModal = ({
  isOpen = false,
  onClose,
  refetchSession,
  onOpenChange,
  selectedId,
  setSelectedId,
}: Props) => {
  const {
    mutateDeleteMeSession,
    isPendingMutateDeleteMeSession,
    isSuccessMutateDeleteMeSession,
  } = useDeleteMeSessionModal();
  useEffect(() => {
    if (isSuccessMutateDeleteMeSession) {
      onClose();
      refetchSession();
    }
  }, [isSuccessMutateDeleteMeSession]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Session</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure wyou want to delete this session?
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
            disabled={isPendingMutateDeleteMeSession}
          >
            Cancel
          </Button>
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 font-medium"
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteMeSession}
            onPress={() => {
              mutateDeleteMeSession(selectedId);
            }}
          >
            {isPendingMutateDeleteMeSession ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete session"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteMeSessionModal;
