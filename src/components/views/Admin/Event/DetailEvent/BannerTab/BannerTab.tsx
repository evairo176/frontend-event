import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";

import React, { useEffect } from "react";
import useBannerTab from "./useBannerTab";
import { Controller } from "react-hook-form";
import { IEventUpdate } from "@/types/Event";

type Props = {
  currentBanner: string;
  onUpdate: (data: IEventUpdate) => void;
  isPendingMutateUpdateEvent: boolean;
  isSuccessMutateUpdateEvent: boolean;
};

const BannerTab = ({
  currentBanner,
  onUpdate,
  isPendingMutateUpdateEvent,
  isSuccessMutateUpdateEvent,
}: Props) => {
  const { back, replace, query, pathname } = useRouter();
  const {
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    handleDeleteBanner,
    handleUploadBanner,
    preview,
    controlUpdateBanner,
    handleSubmitUpdateBanner,
    errorsUpdateBanner,
    resetUpdateBanner,
  } = useBannerTab();

  useEffect(() => {
    if (isSuccessMutateUpdateEvent) {
      resetUpdateBanner();
    }
  }, [isSuccessMutateUpdateEvent]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Event Banner</h1>
          <p className="text-small text-default-500">
            Manage banner of this event
          </p>
        </div>
        <Button
          color="danger"
          onPress={() => back()}
          disabled={
            isPendingMutateUploadFile ||
            isPendingMutateDeleteFile ||
            isPendingMutateUpdateEvent
          }
        >
          <ArrowLeft className="h-4 w-4 text-white" />
          Back
        </Button>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateBanner(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Current banner
            </p>
            <Skeleton
              isLoaded={!!currentBanner}
              className="aspect-square rounded-lg"
            >
              <Image
                src={currentBanner}
                alt="banner"
                fill
                className="!relative"
              />
            </Skeleton>
          </div>

          <Controller
            name="banner"
            control={controlUpdateBanner}
            render={({ field: { onChange, value, ...field } }) => {
              return (
                <InputFile
                  {...field}
                  name="banner"
                  onUpload={(files) => handleUploadBanner(files, onChange)}
                  onDelete={() => handleDeleteBanner(onChange)}
                  isUploading={isPendingMutateUploadFile}
                  isDeleting={isPendingMutateDeleteFile}
                  isInvalid={errorsUpdateBanner.banner !== undefined}
                  errorMessage={errorsUpdateBanner.banner?.message}
                  isLoading={
                    isPendingMutateUploadFile ||
                    isPendingMutateDeleteFile ||
                    isPendingMutateUpdateEvent
                  }
                  isDroppable
                  preview={typeof preview === "string" ? preview : ""}
                  label="Upload new banner"
                />
              );
            }}
          />
          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={
              isPendingMutateUploadFile ||
              isPendingMutateDeleteFile ||
              isPendingMutateUpdateEvent ||
              !preview
            }
          >
            {isPendingMutateUploadFile ||
              isPendingMutateDeleteFile ||
              (isPendingMutateUpdateEvent && (
                <Spinner size="sm" color="white" />
              ))}
            Save Changes
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default BannerTab;
