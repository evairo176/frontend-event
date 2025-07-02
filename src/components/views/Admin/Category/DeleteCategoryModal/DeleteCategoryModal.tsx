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
import useDeleteCategoryModal from "./useDeleteCategoryModal";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchCategory: () => void;
  setSelectedId: Dispatch<SetStateAction<string>>;
  selectedId: string;
};

const DeleteCategoryModal = ({
  isOpen = false,
  onClose,
  refetchCategory,
  onOpenChange,
  selectedId,
  setSelectedId,
}: Props) => {
  const {
    mutateDeleteCatgeory,
    isPendingMutateDeleteCategory,
    isSuccessMutateDeleteCategory,
  } = useDeleteCategoryModal();
  useEffect(() => {
    if (isSuccessMutateDeleteCategory) {
      onClose();
      refetchCategory();
    }
  }, [isSuccessMutateDeleteCategory]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Category</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure wyou want to delete this category?
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
            disabled={isPendingMutateDeleteCategory}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteCategory}
            onPress={() => {
              mutateDeleteCatgeory(selectedId);
            }}
          >
            {isPendingMutateDeleteCategory ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete category"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCategoryModal;
