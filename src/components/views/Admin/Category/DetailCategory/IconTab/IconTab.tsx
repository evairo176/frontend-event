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
import useIconTab from "./useIconTab";
import { Controller } from "react-hook-form";
import { ICategory } from "@/types/Category";

type Props = {
  currentIcon: string;
  onUpdate: (data: ICategory) => void;
  isPendingMutateUpdateCategory: boolean;
  isSuccessMutateUpdateCategory: boolean;
};

const IconTab = ({
  currentIcon,
  onUpdate,
  isPendingMutateUpdateCategory,
  isSuccessMutateUpdateCategory,
}: Props) => {
  const { back } = useRouter();
  const {
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    handleDeleteIcon,
    handleUploadIcon,
    preview,
    controlUpdateIcon,
    handleSubmitUpdateIcon,
    errorsUpdateIcon,
    resetUpdateIcon,
  } = useIconTab();

  useEffect(() => {
    if (isSuccessMutateUpdateCategory) {
      resetUpdateIcon();
    }
  }, [isSuccessMutateUpdateCategory]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Category Icon</h1>
          <p className="text-small text-default-500">
            Manage icon of this category
          </p>
        </div>
        <Button
          color="danger"
          onPress={() => back()}
          disabled={
            isPendingMutateUploadFile ||
            isPendingMutateDeleteFile ||
            isPendingMutateUpdateCategory
          }
        >
          <ArrowLeft className="h-4 w-4 text-white" />
          Back
        </Button>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateIcon(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">Current icon</p>
            <Skeleton
              isLoaded={!!currentIcon}
              className="aspect-square rounded-lg"
            >
              <Image src={currentIcon} alt="icon" fill className="!relative" />
            </Skeleton>
          </div>

          <Controller
            name="icon"
            control={controlUpdateIcon}
            render={({ field: { onChange, value, ...field } }) => {
              return (
                <InputFile
                  {...field}
                  name="icon"
                  onUpload={(files) => handleUploadIcon(files, onChange)}
                  onDelete={() => handleDeleteIcon(onChange)}
                  isUploading={isPendingMutateUploadFile}
                  isDeleting={isPendingMutateDeleteFile}
                  isInvalid={errorsUpdateIcon.icon !== undefined}
                  errorMessage={errorsUpdateIcon.icon?.message}
                  isLoading={
                    isPendingMutateUploadFile ||
                    isPendingMutateDeleteFile ||
                    isPendingMutateUpdateCategory
                  }
                  isDroppable
                  preview={typeof preview === "string" ? preview : ""}
                  label="Upload new icon"
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
              isPendingMutateUpdateCategory ||
              !preview
            }
          >
            {isPendingMutateUploadFile ||
              isPendingMutateDeleteFile ||
              (isPendingMutateUpdateCategory && (
                <Spinner size="sm" color="white" />
              ))}
            Save Changes
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default IconTab;
