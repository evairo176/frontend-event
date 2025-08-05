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
import useDeleteEventModal from "./useDeleteEventModal";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchEvent: () => void;
  setSelectedId: Dispatch<SetStateAction<string>>;
  selectedId: string;
};

const DeleteEventModal = ({
  isOpen = false,
  onClose,
  refetchEvent,
  onOpenChange,
  selectedId,
  setSelectedId,
}: Props) => {
  const {
    mutateDeleteCatgeory,
    isPendingMutateDeleteEvent,
    isSuccessMutateDeleteEvent,
  } = useDeleteEventModal();
  useEffect(() => {
    if (isSuccessMutateDeleteEvent) {
      onClose();
      refetchEvent();
    }
  }, [isSuccessMutateDeleteEvent]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Event</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure wyou want to delete this event?
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
            disabled={isPendingMutateDeleteEvent}
          >
            Cancel
          </Button>
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 font-medium"
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteEvent}
            onPress={() => {
              mutateDeleteCatgeory(selectedId);
            }}
          >
            {isPendingMutateDeleteEvent ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete event"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteEventModal;
