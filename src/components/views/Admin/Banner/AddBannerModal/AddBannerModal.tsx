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
import useAddBannerModal from "./useAddBannerModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchBanner: () => void;
};

const AddBannerModal = ({
  isOpen = false,
  onClose,
  refetchBanner,
  onOpenChange,
}: Props) => {
  const {
    control,
    errors,
    handleSubmitBannerForm,
    handleAddBanner,
    isPendingMutateAddBanner,
    handleUploadIcon,
    handleDeleteIcon,
    handleOnClose,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    preview,
  } = useAddBannerModal({
    callbackSuccess: () => {
      refetchBanner();
      onClose();
    },
  });

  const disabledSubmit = useMemo(() => {
    return (
      isPendingMutateAddBanner ||
      isPendingMutateUploadFile ||
      isPendingMutateDeleteFile
    );
  }, [
    isPendingMutateAddBanner,
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
      <form onSubmit={handleSubmitBannerForm(handleAddBanner)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Banner</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Information</p>
              <Controller
                name="title"
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
                      isInvalid={errors.title !== undefined}
                      errorMessage={errors.title?.message}
                      className="mb-2"
                    />
                  );
                }}
              />
              <Controller
                name="isShow"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      {...field}
                      label="Status"
                      variant="underlined"
                      isInvalid={errors.isShow !== undefined}
                      errorMessage={errors.isShow?.message}
                      disallowEmptySelection
                    >
                      <SelectItem key={"true"} textValue="Show">
                        Show
                      </SelectItem>
                      <SelectItem key={"false"} textValue="Hide">
                        Hide
                      </SelectItem>
                    </Select>
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
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 font-medium"
              color="danger"
              type="submit"
              disabled={disabledSubmit}
            >
              {disabledSubmit ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create banner"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddBannerModal;
