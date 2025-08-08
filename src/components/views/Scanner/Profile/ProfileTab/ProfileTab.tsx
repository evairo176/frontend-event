import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Input,
  Radio,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";

import React, { useEffect } from "react";

import { Controller } from "react-hook-form";
import useProfileTab from "./useProfileTab";
import { IUpdateProfile } from "@/types/Auth";

type Props = {
  currentProfile: string;
  currentName: string;
  currentEmail: string;
  currentUsername: string;
  currentVerified: boolean;
  onUpdate: (data: IUpdateProfile) => void;
  isPendingMutateUpdateProfile: boolean;
  isSuccessMutateUpdateProfile: boolean;
  currentRole: string;
};

const ProfileTab = ({
  currentProfile,
  onUpdate,
  isPendingMutateUpdateProfile,
  isSuccessMutateUpdateProfile,
  currentName,
  currentEmail,
  currentUsername,
  currentVerified,
  currentRole,
}: Props) => {
  const { back } = useRouter();

  const {
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    handleDeleteProfile,
    handleUploadProfile,
    preview,
    controlUpdateProfile,
    handleSubmitUpdateProfile,
    errorsUpdateProfile,
    resetUpdateProfile,
  } = useProfileTab({ fullname: currentName });

  useEffect(() => {
    if (isSuccessMutateUpdateProfile) {
      resetUpdateProfile();
    }
  }, [isSuccessMutateUpdateProfile]);

  return (
    <Card className="w-full p-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Member Profile</h1>
          <p className="text-small text-default-500">Manage profile</p>
        </div>
        <Button
          color="danger"
          onPress={() => back()}
          disabled={
            isPendingMutateUploadFile ||
            isPendingMutateDeleteFile ||
            isPendingMutateUpdateProfile
          }
        >
          <ArrowLeft className="h-4 w-4 text-white" />
          Back
        </Button>
      </CardHeader>
      <CardBody>
        <form
          className="grid grid-cols-1 gap-4 lg:grid-cols-2"
          onSubmit={handleSubmitUpdateProfile(onUpdate)}
        >
          <div>
            <div className="flex items-center justify-center">
              <Skeleton
                isLoaded={!!currentProfile}
                className="aspect-square rounded-full"
              >
                <div className="h-[200px] w-[200px] lg:h-[400px] lg:w-[400px]">
                  <Image
                    src={
                      ["user.jpg", "nana.jpg"].includes(currentProfile)
                        ? "/images/user/user.png"
                        : currentProfile
                    }
                    alt="profile"
                    fill
                    className="!relative rounded-full"
                  />
                </div>
              </Skeleton>
            </div>

            <Controller
              name="profilePicture"
              control={controlUpdateProfile}
              render={({ field: { onChange, value, ...field } }) => {
                return (
                  <InputFile
                    {...field}
                    name="profile"
                    onUpload={(files) => handleUploadProfile(files, onChange)}
                    onDelete={() => handleDeleteProfile(onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDeleteFile}
                    isInvalid={errorsUpdateProfile.profilePicture !== undefined}
                    errorMessage={errorsUpdateProfile.profilePicture?.message}
                    isLoading={
                      isPendingMutateUploadFile ||
                      isPendingMutateDeleteFile ||
                      isPendingMutateUpdateProfile
                    }
                    isDroppable
                    preview={typeof preview === "string" ? preview : ""}
                    label="Upload new profile"
                  />
                );
              }}
            />
          </div>
          <div>
            <Skeleton className="mb-2 rounded-md" isLoaded={!!currentName}>
              <Input
                type="text"
                label="Name"
                variant="underlined"
                autoComplete="off"
                defaultValue={currentName}
                value={currentName}
                className="mb-2"
                disabled
              />
            </Skeleton>
            <Skeleton className="mb-2 rounded-md" isLoaded={!!currentUsername}>
              <Input
                type="text"
                label="Username"
                variant="underlined"
                autoComplete="off"
                defaultValue={currentUsername}
                value={currentUsername}
                className="mb-2"
                disabled
              />
            </Skeleton>
            <Skeleton className="mb-2 rounded-md" isLoaded={!!currentEmail}>
              <Input
                type="text"
                label="Email"
                variant="underlined"
                autoComplete="off"
                defaultValue={currentEmail}
                value={currentEmail}
                className="mb-2"
                disabled
              />
            </Skeleton>
            <Skeleton className="mb-2 rounded-md" isLoaded={!!currentRole}>
              {currentVerified && (
                <Checkbox
                  isSelected={currentVerified}
                  defaultSelected={currentVerified}
                  isDisabled
                >
                  <label className="text-sm">Verified</label>
                </Checkbox>
              )}
            </Skeleton>
            <Skeleton className="mb-2 rounded-md" isLoaded={!!currentRole}>
              <div>
                <p className="text-sm">
                  Role: <span className="font-semibold">{currentRole}</span>
                </p>
              </div>
            </Skeleton>
          </div>
          <Button
            color="danger"
            className="mt-2 bg-gradient-to-r from-blue-600 to-purple-600 font-medium disabled:bg-default-500"
            type="submit"
            disabled={
              isPendingMutateUploadFile ||
              isPendingMutateDeleteFile ||
              isPendingMutateUpdateProfile ||
              !preview
            }
          >
            {isPendingMutateUploadFile ||
              isPendingMutateDeleteFile ||
              (isPendingMutateUpdateProfile && (
                <Spinner size="sm" color="white" />
              ))}
            Save Changes
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default ProfileTab;
