import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
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
import useAddEventModal from "./useAddEventModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { ICategory } from "@/types/Category";
import { getLocalTimeZone, now } from "@internationalized/date";
import { IRegion } from "@/types/Regency";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchEvent: () => void;
};

const AddEventModal = ({
  isOpen = false,
  onClose,
  refetchEvent,
  onOpenChange,
}: Props) => {
  const {
    control,
    errors,
    handleSubmitEventForm,
    handleAddEvent,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,

    handleUploadBanner,
    handleDeleteBanner,
    handleOnClose,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    preview,

    dataCategory,
    isLoadingCategory,

    dataRegionId,
    isLoadingRegionId,
    handleSearchRegionId,
  } = useAddEventModal();

  useEffect(() => {
    if (isSuccessMutateAddEvent) {
      onClose();
      refetchEvent();
    }
  }, [isSuccessMutateAddEvent]);

  const disabledSubmit = useMemo(() => {
    return (
      isPendingMutateAddEvent ||
      isPendingMutateUploadFile ||
      isPendingMutateDeleteFile
    );
  }, [
    isPendingMutateAddEvent,
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
      <form onSubmit={handleSubmitEventForm(handleAddEvent)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Event</ModalHeader>
          <ModalBody>
            <div className="space-y-2">
              <p className="mb-1 mt-2 text-sm font-bold text-gray-800">
                Information
              </p>
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
                    />
                  );
                }}
              />
              <Controller
                name="categoryId"
                control={control}
                render={({ field: { onChange, ...field } }) => {
                  return (
                    <Autocomplete
                      {...field}
                      isLoading={isLoadingCategory}
                      disabled={isLoadingCategory}
                      defaultItems={dataCategory?.data?.data || []}
                      label="Category"
                      placeholder="Search Category here"
                      variant="underlined"
                      isInvalid={errors.categoryId !== undefined}
                      errorMessage={errors.categoryId?.message}
                      onSelectionChange={(value) => {
                        onChange(value);
                      }}
                    >
                      {(category: ICategory) => {
                        return (
                          <AutocompleteItem key={`${category.id}`}>
                            {category.name}
                          </AutocompleteItem>
                        );
                      }}
                    </Autocomplete>
                  );
                }}
              />
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => {
                    return (
                      <DatePicker
                        {...field}
                        defaultValue={now(getLocalTimeZone())}
                        label="Start Date"
                        variant="underlined"
                        isInvalid={errors.startDate !== undefined}
                        errorMessage={errors.startDate?.message}
                        hideTimeZone
                        showMonthAndYearPickers
                      />
                    );
                  }}
                />
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => {
                    return (
                      <DatePicker
                        {...field}
                        defaultValue={now(getLocalTimeZone())}
                        label="End Date"
                        variant="underlined"
                        isInvalid={errors.endDate !== undefined}
                        errorMessage={errors.endDate?.message}
                        hideTimeZone
                        showMonthAndYearPickers
                      />
                    );
                  }}
                />
              </div>
              <Controller
                name="isPublished"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      {...field}
                      label="Status"
                      variant="underlined"
                      isInvalid={errors.isPublished !== undefined}
                      errorMessage={errors.isPublished?.message}
                      disallowEmptySelection
                    >
                      <SelectItem key={"true"} textValue="Publish">
                        Publish
                      </SelectItem>
                      <SelectItem key={"false"} textValue="Draft">
                        Draft
                      </SelectItem>
                    </Select>
                  );
                }}
              />
              <Controller
                name="isFeatured"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      {...field}
                      label="Featured"
                      variant="underlined"
                      isInvalid={errors.isFeatured !== undefined}
                      errorMessage={errors.isFeatured?.message}
                      disallowEmptySelection
                    >
                      <SelectItem key={"true"} textValue="Yes">
                        Yes
                      </SelectItem>
                      <SelectItem key={"false"} textValue="No">
                        No
                      </SelectItem>
                    </Select>
                  );
                }}
              />
              <Controller
                name="isOnline"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      {...field}
                      label="Online / Offline"
                      variant="underlined"
                      isInvalid={errors.isOnline !== undefined}
                      errorMessage={errors.isOnline?.message}
                      disallowEmptySelection
                    >
                      <SelectItem key={"true"} textValue="Online">
                        Online
                      </SelectItem>
                      <SelectItem key={"false"} textValue="Offline">
                        Offline
                      </SelectItem>
                    </Select>
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
              <p className="mb-1 mt-2 text-sm font-bold text-gray-800">
                Location
              </p>
              <div>
                <Controller
                  name="regionId"
                  control={control}
                  render={({ field: { onChange, ...field } }) => {
                    return (
                      <Autocomplete
                        {...field}
                        isLoading={isLoadingRegionId}
                        disabled={isLoadingRegionId}
                        defaultItems={dataRegionId?.data?.data || []}
                        label="City"
                        placeholder="Search city here"
                        variant="underlined"
                        isInvalid={errors.regionId !== undefined}
                        errorMessage={errors.regionId?.message}
                        onSelectionChange={(value) => {
                          onChange(value);
                        }}
                        onInputChange={(value) => handleSearchRegionId(value)}
                      >
                        {(region: IRegion) => {
                          return (
                            <AutocompleteItem key={`${region.code}`}>
                              {region.name}
                            </AutocompleteItem>
                          );
                        }}
                      </Autocomplete>
                    );
                  }}
                />
                <Controller
                  name="latitude"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        type="text"
                        label="Latitude"
                        variant="underlined"
                        autoComplete="off"
                        isInvalid={errors.latitude !== undefined}
                        errorMessage={errors.latitude?.message}
                      />
                    );
                  }}
                />
                <Controller
                  name="longitude"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        type="text"
                        label="Longitude"
                        variant="underlined"
                        autoComplete="off"
                        isInvalid={errors.longitude !== undefined}
                        errorMessage={errors.longitude?.message}
                      />
                    );
                  }}
                />
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Textarea
                        {...field}
                        label="Address"
                        variant="underlined"
                        autoComplete="off"
                        isInvalid={errors.address !== undefined}
                        errorMessage={errors.address?.message}
                      />
                    );
                  }}
                />
              </div>

              <Controller
                name="banner"
                control={control}
                render={({ field: { onChange, value, ...field } }) => {
                  return (
                    <InputFile
                      {...field}
                      name="icon"
                      onUpload={(files) => handleUploadBanner(files, onChange)}
                      onDelete={() => handleDeleteBanner(onChange)}
                      isUploading={isPendingMutateUploadFile}
                      isDeleting={isPendingMutateDeleteFile}
                      isInvalid={errors.banner !== undefined}
                      isLoading={disabledSubmit}
                      errorMessage={errors.banner?.message}
                      isDroppable
                      preview={typeof preview === "string" ? preview : ""}
                      label="Cover"
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
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 font-medium"
              color="danger"
              type="submit"
              disabled={disabledSubmit}
            >
              {disabledSubmit ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create event"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddEventModal;
