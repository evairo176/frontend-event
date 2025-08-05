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
import React, { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { Controller } from "react-hook-form";
import useDetailTicketModal from "./useDetailTicketModal";
import { ITicket } from "@/types/Ticket";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTicket: () => void;
  selectedDataTicket: ITicket | null;
  setSelectedDataTicket: Dispatch<SetStateAction<ITicket | null>>;
};

const DetailTicketModal = ({
  isOpen = false,
  onClose,
  refetchTicket,
  onOpenChange,
  selectedDataTicket,
  setSelectedDataTicket,
}: Props) => {
  const {
    control,
    errors,
    handleSubmitTicketForm,
    handleUpdateTicket,
    isPendingMutateUpdateTicket,
    isSuccessMutateUpdateTicket,

    handleOnClose,

    setValue,
  } = useDetailTicketModal(selectedDataTicket, setSelectedDataTicket);

  useEffect(() => {
    if (isSuccessMutateUpdateTicket) {
      onClose();
      refetchTicket();
    }
  }, [isSuccessMutateUpdateTicket]);

  const disabledSubmit = useMemo(() => {
    return isPendingMutateUpdateTicket;
  }, [isPendingMutateUpdateTicket]);

  useEffect(() => {
    if (selectedDataTicket) {
      setValue("name", `${selectedDataTicket.name}`);
      setValue("price", `${selectedDataTicket.price}`);
      setValue("quantity", `${selectedDataTicket.quantity}`);
      setValue("description", `${selectedDataTicket.description}`);
    }
  }, [selectedDataTicket]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitTicketForm(handleUpdateTicket)}>
        <ModalContent className="m-4">
          <ModalHeader>Update Ticket</ModalHeader>
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
                "Save changes"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default DetailTicketModal;
