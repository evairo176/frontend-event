import { IUpdateFormBanner } from "@/types/Banner";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
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

type Props = {
  dataBanner: IUpdateFormBanner;
  onUpdate: (data: IUpdateFormBanner) => void;
  isPendingMutateUpdateBanner: boolean;
  isSuccessMutateUpdateBanner: boolean;
};

const InfoTab = ({
  dataBanner,
  onUpdate,
  isPendingMutateUpdateBanner,
  isSuccessMutateUpdateBanner,
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
    if (isSuccessMutateUpdateBanner) {
      resetUpdateInfo();
    }
  }, [isSuccessMutateUpdateBanner]);

  useEffect(() => {
    if (dataBanner) {
      setValueUpdateInfo("title", `${dataBanner?.title}`);
      setValueUpdateInfo("isShow", `${dataBanner?.isShow}`);
    }
  }, [dataBanner]);
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Banner Information</h1>
          <p className="text-small text-default-500">
            Manage information of this banner
          </p>
        </div>
        <Button
          color="danger"
          onPress={() => back()}
          disabled={isPendingMutateUpdateBanner}
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
          <Skeleton className="rounded-md" isLoaded={!!dataBanner?.title}>
            <Controller
              name="title"
              control={controlUpdateInfo}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="text"
                    label="Name"
                    variant="underlined"
                    autoComplete="off"
                    isInvalid={errorsUpdateInfo.title !== undefined}
                    errorMessage={errorsUpdateInfo.title?.message}
                    className="mb-2"
                  />
                );
              }}
            />
          </Skeleton>
          <Skeleton
            className="rounded-md"
            isLoaded={!!String(dataBanner?.isShow)}
          >
            <Controller
              name="isShow"
              control={controlUpdateInfo}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    label="Status"
                    variant="underlined"
                    isInvalid={errorsUpdateInfo.isShow !== undefined}
                    errorMessage={errorsUpdateInfo.isShow?.message}
                    defaultSelectedKeys={[
                      dataBanner?.isShow ? "true" : "false",
                    ]}
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
          </Skeleton>
          <Button
            color="danger"
            className="mt-2 bg-gradient-to-r from-blue-600 to-purple-600 font-medium disabled:bg-default-500"
            type="submit"
            disabled={isPendingMutateUpdateBanner}
          >
            {isPendingMutateUpdateBanner && <Spinner size="sm" color="white" />}
            Save Changes
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default InfoTab;
