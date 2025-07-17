import { ICategory } from "@/types/Category";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";

type Props = {
  dataCategory: ICategory;
  onUpdate: (data: ICategory) => void;
  isPendingMutateUpdateCategory: boolean;
  isSuccessMutateUpdateCategory: boolean;
};

const InfoTab = ({
  dataCategory,
  onUpdate,
  isPendingMutateUpdateCategory,
  isSuccessMutateUpdateCategory,
}: Props) => {
  const { back } = useRouter();
  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    if (isSuccessMutateUpdateCategory) {
      resetUpdateInfo();
    }
  }, [isSuccessMutateUpdateCategory]);

  useEffect(() => {
    if (dataCategory) {
      setValueUpdateInfo("name", `${dataCategory?.name}`);
      setValueUpdateInfo("description", `${dataCategory?.description}`);
    }
  }, [dataCategory]);
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Category Information</h1>
          <p className="text-small text-default-500">
            Manage information of this category
          </p>
        </div>
        <Button
          color="danger"
          onPress={() => back()}
          disabled={isPendingMutateUpdateCategory}
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
          <Skeleton className="rounded-md" isLoaded={!!dataCategory?.name}>
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
            isLoaded={!!dataCategory?.description}
          >
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
            className="mt-2 bg-gradient-to-r from-blue-600 to-purple-600 font-medium disabled:bg-default-500"
            type="submit"
            disabled={isPendingMutateUpdateCategory}
          >
            {isPendingMutateUpdateCategory && (
              <Spinner size="sm" color="white" />
            )}
            Save Changes
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default InfoTab;
