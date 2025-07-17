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

import { Controller } from "react-hook-form";
import { IUpdateFormBanner } from "@/types/Banner";
import useImageTab from "./useImageTab";

type Props = {
  currentImage: string;
  onUpdate: (data: IUpdateFormBanner) => void;
  isPendingMutateUpdateBanner: boolean;
  isSuccessMutateUpdateBanner: boolean;
};

const ImageTab = ({
  currentImage,
  onUpdate,
  isPendingMutateUpdateBanner,
  isSuccessMutateUpdateBanner,
}: Props) => {
  const { back } = useRouter();
  const {
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    handleDeleteImage,
    handleUploadImage,
    preview,
    controlUpdateImage,
    handleSubmitUpdateImage,
    errorsUpdateImage,
    resetUpdateImage,
  } = useImageTab();

  useEffect(() => {
    if (isSuccessMutateUpdateBanner) {
      resetUpdateImage();
    }
  }, [isSuccessMutateUpdateBanner]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Banner Image</h1>
          <p className="text-small text-default-500">
            Manage image of this banner
          </p>
        </div>
        <Button
          color="danger"
          onPress={() => back()}
          disabled={
            isPendingMutateUploadFile ||
            isPendingMutateDeleteFile ||
            isPendingMutateUpdateBanner
          }
        >
          <ArrowLeft className="h-4 w-4 text-white" />
          Back
        </Button>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateImage(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Current image
            </p>
            <Skeleton
              isLoaded={!!currentImage}
              className="aspect-square rounded-lg"
            >
              <Image
                src={currentImage}
                alt="image"
                fill
                className="!relative"
              />
            </Skeleton>
          </div>

          <Controller
            name="image"
            control={controlUpdateImage}
            render={({ field: { onChange, value, ...field } }) => {
              return (
                <InputFile
                  {...field}
                  name="image"
                  onUpload={(files) => handleUploadImage(files, onChange)}
                  onDelete={() => handleDeleteImage(onChange)}
                  isUploading={isPendingMutateUploadFile}
                  isDeleting={isPendingMutateDeleteFile}
                  isInvalid={errorsUpdateImage.image !== undefined}
                  errorMessage={errorsUpdateImage.image?.message}
                  isLoading={
                    isPendingMutateUploadFile ||
                    isPendingMutateDeleteFile ||
                    isPendingMutateUpdateBanner
                  }
                  isDroppable
                  preview={typeof preview === "string" ? preview : ""}
                  label="Upload new image"
                />
              );
            }}
          />
          <Button
            color="danger"
            className="mt-2 bg-gradient-to-r from-blue-600 to-purple-600 font-medium disabled:bg-default-500"
            type="submit"
            disabled={
              isPendingMutateUploadFile ||
              isPendingMutateDeleteFile ||
              isPendingMutateUpdateBanner ||
              !preview
            }
          >
            {isPendingMutateUploadFile ||
              isPendingMutateDeleteFile ||
              (isPendingMutateUpdateBanner && (
                <Spinner size="sm" color="white" />
              ))}
            Save Changes
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default ImageTab;
