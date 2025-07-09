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
import useLocationTab from "./useLocationTab";
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

const LocationTab = ({
  dataEvent,
  onUpdate,
  isPendingMutateUpdateEvent,
  isSuccessMutateUpdateEvent,
}: Props) => {
  const { back, replace, query, pathname } = useRouter();
  const {
    controlUpdateLocation,
    errorsUpdateLocation,
    handleSubmitUpdateLocation,
    resetUpdateLocation,
    setValueUpdateLocation,

    dataRegionId,
    isLoadingRegionId,
    handleSearchRegionId,
  } = useLocationTab();

  useEffect(() => {
    if (isSuccessMutateUpdateEvent) {
      resetUpdateLocation();
    }
  }, [isSuccessMutateUpdateEvent]);

  useEffect(() => {
    if (dataEvent) {
      setValueUpdateLocation(
        "isOnline",
        `${dataEvent?.isOnline ? "true" : "false"}`,
      );
      setValueUpdateLocation("regionId", `${dataEvent?.regionId}`);
      setValueUpdateLocation("latitude", `${dataEvent?.latitude}`);
      setValueUpdateLocation("longitude", `${dataEvent?.longitude}`);
      setValueUpdateLocation("address", `${dataEvent?.address}`);
    }
  }, [dataEvent]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Event Location</h1>
          <p className="text-small text-default-500">
            Manage location of this event
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
          onSubmit={handleSubmitUpdateLocation(onUpdate)}
        >
          <Skeleton className="rounded-md" isLoaded={!!dataEvent?.isOnline}>
            <Controller
              name="isOnline"
              control={controlUpdateLocation}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    label="Online / Offline"
                    variant="underlined"
                    isInvalid={errorsUpdateLocation.isOnline !== undefined}
                    errorMessage={errorsUpdateLocation.isOnline?.message}
                    defaultSelectedKeys={[
                      dataEvent?.isOnline ? "true" : "false",
                    ]}
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
          </Skeleton>
          <p className="mb-1 mt-2 text-sm font-bold text-gray-800">Location</p>
          <div>
            <Skeleton
              className="rounded-md"
              isLoaded={!!dataEvent?.regionId && !!dataRegionId}
            >
              <Controller
                name="regionId"
                control={controlUpdateLocation}
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
                      isInvalid={errorsUpdateLocation.regionId !== undefined}
                      errorMessage={errorsUpdateLocation.regionId?.message}
                      onSelectionChange={(value) => {
                        onChange(value);
                      }}
                      onInputChange={(value) => handleSearchRegionId(value)}
                      selectedKey={field.value} // controlled value
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
            </Skeleton>
            <Skeleton className="rounded-md" isLoaded={!!dataEvent?.latitude}>
              <Controller
                name="latitude"
                control={controlUpdateLocation}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      type="text"
                      label="Latitude"
                      variant="underlined"
                      autoComplete="off"
                      isInvalid={errorsUpdateLocation.latitude !== undefined}
                      errorMessage={errorsUpdateLocation.latitude?.message}
                    />
                  );
                }}
              />
            </Skeleton>
            <Skeleton className="rounded-md" isLoaded={!!dataEvent?.longitude}>
              <Controller
                name="longitude"
                control={controlUpdateLocation}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      type="text"
                      label="Longitude"
                      variant="underlined"
                      autoComplete="off"
                      isInvalid={errorsUpdateLocation.longitude !== undefined}
                      errorMessage={errorsUpdateLocation.longitude?.message}
                    />
                  );
                }}
              />
            </Skeleton>
            <Skeleton className="rounded-md" isLoaded={!!dataEvent?.address}>
              <Controller
                name="address"
                control={controlUpdateLocation}
                render={({ field }) => {
                  return (
                    <Textarea
                      {...field}
                      label="Address"
                      variant="underlined"
                      autoComplete="off"
                      isInvalid={errorsUpdateLocation.address !== undefined}
                      errorMessage={errorsUpdateLocation.address?.message}
                    />
                  );
                }}
              />
            </Skeleton>
          </div>

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

export default LocationTab;
