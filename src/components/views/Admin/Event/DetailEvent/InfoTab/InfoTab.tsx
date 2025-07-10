import { IEventUpdate } from "@/types/Event";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { ICategory } from "@/types/Category";
import { toInputDate } from "@/utils/date";
import { IRegion } from "@/types/Regency";

type Props = {
  dataEvent: IEventUpdate;
  onUpdate: (data: IEventUpdate) => void;
  isPendingMutateUpdateEvent: boolean;
  isSuccessMutateUpdateEvent: boolean;
};

const InfoTab = ({
  dataEvent,
  onUpdate,
  isPendingMutateUpdateEvent,
  isSuccessMutateUpdateEvent,
}: Props) => {
  const { back, replace, query, pathname } = useRouter();
  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,

    dataCategory,
    isLoadingCategory,
  } = useInfoTab();

  useEffect(() => {
    if (isSuccessMutateUpdateEvent) {
      resetUpdateInfo();
    }
  }, [isSuccessMutateUpdateEvent]);

  useEffect(() => {
    if (dataEvent) {
      setValueUpdateInfo("name", `${dataEvent?.name}`);
      setValueUpdateInfo("description", `${dataEvent?.description}`);
      setValueUpdateInfo("categoryId", `${dataEvent?.categoryId}`);
      setValueUpdateInfo("startDate", toInputDate(`${dataEvent?.startDate}`));
      setValueUpdateInfo("endDate", toInputDate(`${dataEvent?.endDate}`));
      setValueUpdateInfo(
        "isPublished",
        `${dataEvent?.isPublished ? "true" : "false"}`,
      );
      setValueUpdateInfo(
        "isFeatured",
        `${dataEvent?.isFeatured ? "true" : "false"}`,
      );
    }
  }, [dataEvent]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Event Information</h1>
          <p className="text-small text-default-500">
            Manage information of this event
          </p>
        </div>
        <Button
          color="danger"
          onPress={() => back()}
          disabled={isPendingMutateUpdateEvent}
        >
          <ArrowLeft className="h-4 w-4 text-white" />
          Back
        </Button>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton className="rounded-md" isLoaded={!!dataEvent?.name}>
            <Controller
              name="name"
              control={controlUpdateInfo}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="text"
                    label="Name"
                    variant="underlined"
                    autoComplete="off"
                    isInvalid={errorsUpdateInfo.name !== undefined}
                    errorMessage={errorsUpdateInfo.name?.message}
                    className="mb-2"
                  />
                );
              }}
            />
          </Skeleton>
          <Skeleton
            className="rounded-md"
            isLoaded={!!dataEvent?.categoryId && !!dataCategory?.data?.data}
          >
            <Controller
              name="categoryId"
              control={controlUpdateInfo}
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
                    isInvalid={errorsUpdateInfo.categoryId !== undefined}
                    errorMessage={errorsUpdateInfo.categoryId?.message}
                    onSelectionChange={(value) => {
                      onChange(value);
                    }}
                    selectedKey={field.value} // controlled value
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
          </Skeleton>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <Skeleton className="rounded-md" isLoaded={!!dataEvent?.startDate}>
              <Controller
                name="startDate"
                control={controlUpdateInfo}
                render={({ field }) => {
                  return (
                    <DatePicker
                      {...field}
                      label="Start Date"
                      variant="underlined"
                      isInvalid={errorsUpdateInfo.startDate !== undefined}
                      errorMessage={errorsUpdateInfo.startDate?.message}
                      hideTimeZone
                      showMonthAndYearPickers
                    />
                  );
                }}
              />
            </Skeleton>
            <Skeleton className="rounded-md" isLoaded={!!dataEvent?.endDate}>
              <Controller
                name="endDate"
                control={controlUpdateInfo}
                render={({ field }) => {
                  return (
                    <DatePicker
                      {...field}
                      label="End Date"
                      variant="underlined"
                      isInvalid={errorsUpdateInfo.endDate !== undefined}
                      errorMessage={errorsUpdateInfo.endDate?.message}
                      hideTimeZone
                      showMonthAndYearPickers
                    />
                  );
                }}
              />
            </Skeleton>
          </div>
          <Skeleton
            className="rounded-md"
            isLoaded={!!String(dataEvent?.isPublished)}
          >
            <Controller
              name="isPublished"
              control={controlUpdateInfo}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    label="Status"
                    variant="underlined"
                    isInvalid={errorsUpdateInfo.isPublished !== undefined}
                    errorMessage={errorsUpdateInfo.isPublished?.message}
                    defaultSelectedKeys={[
                      dataEvent?.isPublished ? "true" : "false",
                    ]}
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
          </Skeleton>

          <Skeleton
            className="rounded-md"
            isLoaded={!!String(dataEvent?.isFeatured)}
          >
            <Controller
              name="isFeatured"
              control={controlUpdateInfo}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    label="Featured"
                    variant="underlined"
                    isInvalid={errorsUpdateInfo.isFeatured !== undefined}
                    errorMessage={errorsUpdateInfo.isFeatured?.message}
                    defaultSelectedKeys={[
                      dataEvent?.isFeatured ? "true" : "false",
                    ]}
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
          </Skeleton>

          <Skeleton className="rounded-md" isLoaded={!!dataEvent?.description}>
            <Controller
              name="description"
              control={controlUpdateInfo}
              render={({ field }) => {
                return (
                  <Textarea
                    {...field}
                    label="Description"
                    variant="underlined"
                    autoComplete="off"
                    isInvalid={errorsUpdateInfo.description !== undefined}
                    errorMessage={errorsUpdateInfo.description?.message}
                    className="mb-2"
                  />
                );
              }}
            />
          </Skeleton>

          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingMutateUpdateEvent}
          >
            {isPendingMutateUpdateEvent && <Spinner size="sm" color="white" />}
            Save Changes
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default InfoTab;
