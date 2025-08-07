import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@heroui/react";
import React, { useEffect, useMemo } from "react";
import useAddUserModal from "./useAddUserModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import CategoryIconPicker from "@/components/ui/CategoryIcon/CategoryIconPicker";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchUser: () => void;
};

const AddUserModal = ({
  isOpen = false,
  onClose,
  refetchUser,
  onOpenChange,
}: Props) => {
  const {
    control,
    errors,
    handleSubmitUserForm,
    handleAddUser,
    isPendingMutateAddUser,
  } = useAddUserModal({
    callbackSuccess: () => {
      refetchUser();
      onClose();
    },
  });

  const disabledSubmit = useMemo(() => {
    return isPendingMutateAddUser;
  }, [isPendingMutateAddUser]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <form onSubmit={handleSubmitUserForm(handleAddUser)}>
        <ModalContent className="m-4">
          <ModalHeader>Add User</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Information</p>
              <Controller
                name="fullname"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      autoFocus
                      type="text"
                      label="Fullname"
                      variant="underlined"
                      autoComplete="off"
                      isInvalid={errors.fullname !== undefined}
                      errorMessage={errors.fullname?.message}
                      className="mb-2"
                    />
                  );
                }}
              />
              <Controller
                name="username"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      autoFocus
                      type="text"
                      label="Username"
                      variant="underlined"
                      autoComplete="off"
                      isInvalid={errors.username !== undefined}
                      errorMessage={errors.username?.message}
                      className="mb-2"
                    />
                  );
                }}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      autoFocus
                      type="text"
                      label="Email"
                      variant="underlined"
                      autoComplete="off"
                      isInvalid={errors.email !== undefined}
                      errorMessage={errors.email?.message}
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
              onPress={onClose}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 font-medium"
              color="danger"
              type="submit"
              disabled={disabledSubmit}
            >
              {disabledSubmit ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create user"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddUserModal;
