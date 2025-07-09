import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@heroui/react";
import React, { useEffect, useMemo } from "react";
import useAddTicketModal from "./useAddTicketModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTicket: () => void;
};

const AddTicketModal = ({
  isOpen = false,
  onClose,
  refetchTicket,
  onOpenChange,
}: Props) => {
  const {
    control,
    errors,
    handleSubmitTicketForm,
    handleAddTicket,
    isPendingMutateAddTicket,
    isSuccessMutateAddTicket,

    handleUploadIcon,
    handleDeleteIcon,
    handleOnClose,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    preview,
  } = useAddTicketModal();

  useEffect(() => {
    if (isSuccessMutateAddTicket) {
      onClose();
      refetchTicket();
    }
  }, [isSuccessMutateAddTicket]);

  const disabledSubmit = useMemo(() => {
    return (
      isPendingMutateAddTicket ||
      isPendingMutateUploadFile ||
      isPendingMutateDeleteFile
    );
  }, [
    isPendingMutateAddTicket,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
  ]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitTicketForm(handleAddTicket)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Ticket</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Information</p>
              <Controller
                name="name"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      autoFocus
                      type="text"
                      label="Name"
                      variant="underlined"
                      autoComplete="off"
                      isInvalid={errors.name !== undefined}
                      errorMessage={errors.name?.message}
                      className="mb-2"
                    />
                  );
                }}
              />
              <Controller
                name="price"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      autoFocus
                      type="text"
                      label="Price"
                      variant="underlined"
                      autoComplete="off"
                      isInvalid={errors.price !== undefined}
                      errorMessage={errors.price?.message}
                      className="mb-2"
                    />
                  );
                }}
              />
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      autoFocus
                      type="text"
                      label="Quantity"
                      variant="underlined"
                      autoComplete="off"
                      isInvalid={errors.quantity !== undefined}
                      errorMessage={errors.quantity?.message}
                      className="mb-2"
                    />
                  );
                }}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => {
                  return (
                    <Textarea
                      {...field}
                      label="Description"
                      variant="underlined"
                      autoComplete="off"
                      isInvalid={errors.description !== undefined}
                      errorMessage={errors.description?.message}
                      className="mb-2"
                    />
                  );
                }}
              />

              <div>
                <Controller
                  name="image"
                  control={control}
                  render={({ field: { onChange, value, ...field } }) => {
                    return (
                      <InputFile
                        {...field}
                        name="icon"
                        onUpload={(files) => handleUploadIcon(files, onChange)}
                        onDelete={() => handleDeleteIcon(onChange)}
                        isUploading={isPendingMutateUploadFile}
                        isDeleting={isPendingMutateDeleteFile}
                        isInvalid={errors.image !== undefined}
                        isLoading={disabledSubmit}
                        errorMessage={errors.image?.message}
                        isDroppable
                        preview={typeof preview === "string" ? preview : ""}
                        label="Image"
                      />
                    );
                  }}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => handleOnClose(onClose)}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button color="danger" type="submit" disabled={disabledSubmit}>
              {disabledSubmit ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create ticket"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddTicketModal;
