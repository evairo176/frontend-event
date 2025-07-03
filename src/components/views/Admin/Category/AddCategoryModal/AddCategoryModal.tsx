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
    isSuccessMutateAddCategory,

    handleUploadIcon,
    handleDeleteIcon,
    handleOnClose,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    preview,
  } = useAddCategoryModal();

  useEffect(() => {
    if (isSuccessMutateAddCategory) {
      onClose();
      refetchCategory();
    }
  }, [isSuccessMutateAddCategory]);

  const disabledSubmit = useMemo(() => {
    return (
      isPendingMutateAddCategory ||
      isPendingMutateUploadFile ||
      isPendingMutateDeleteFile
    );
  }, [
    isPendingMutateAddCategory,
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
      <form onSubmit={handleSubmitCategoryForm(handleAddCategory)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Category</ModalHeader>
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
                  name="icon"
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
                        isInvalid={errors.icon !== undefined}
                        isLoading={disabledSubmit}
                        errorMessage={errors.icon?.message}
                        isDroppable
                        preview={typeof preview === "string" ? preview : ""}
                        label="Icon"
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
