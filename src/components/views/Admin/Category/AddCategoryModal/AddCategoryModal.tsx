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
import React, { useEffect } from "react";
import useAddCategoryModal from "./useAddCategoryModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchCategory: () => void;
};

const AddCategoryModal = ({
  isOpen = false,
  onClose,
  refetchCategory,
  onOpenChange,
}: Props) => {
  const {
    control,
    errors,
    handleSubmitCategoryForm,
    handleAddCategory,
    isPendingMutateAddCategory,
    isPendingMutateAddFile,
  } = useAddCategoryModal({ onClose, refetchCategory });

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmitCategoryForm(handleAddCategory)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Category</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
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
                    />
                  );
                }}
              />

              <div>
                <p className="text-sm text-gray-400">Icon</p>
                <Controller
                  name="icon"
                  control={control}
                  render={({ field: { onChange, value, ...field } }) => {
                    return (
                      <InputFile
                        {...field}
                        name="icon"
                        onChange={(e) => {
                          onChange(e.currentTarget.files);
                        }}
                        isInvalid={errors.icon !== undefined}
                        errorMessage={errors.icon?.message}
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
              onPress={onClose}
              disabled={isPendingMutateAddCategory || isPendingMutateAddFile}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              type="submit"
              disabled={isPendingMutateAddCategory || isPendingMutateAddFile}
            >
              {isPendingMutateAddCategory || isPendingMutateAddFile ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create category"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddCategoryModal;
