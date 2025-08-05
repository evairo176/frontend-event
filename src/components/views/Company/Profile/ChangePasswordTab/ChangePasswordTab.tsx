import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Spinner,
} from "@heroui/react";
import { ArrowLeft, Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useChangePasswordTab from "./useChangePasswordTab";
import { Controller } from "react-hook-form";

import { IUpdatePassword, IUpdateProfile } from "@/types/Auth";

type Props = {
  onUpdate: (data: IUpdatePassword) => void;
  isPendingMutateUpdateProfile: boolean;
  isSuccessMutateUpdateProfile: boolean;
};

const ChangePasswordTab = ({
  onUpdate,
  isPendingMutateUpdateProfile,
  isSuccessMutateUpdateProfile,
}: Props) => {
  const { back } = useRouter();
  const {
    visiblePassword,
    handleVisiblePassword,
    handleSubmitUpdatePassword,
    controlUpdatePassword,
    errorsUpdatePassword,
    resetUpdatePassword,
  } = useChangePasswordTab();

  useEffect(() => {
    if (isSuccessMutateUpdateProfile) {
      resetUpdatePassword();
    }
  }, [isSuccessMutateUpdateProfile]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Profile Password</h1>
          <p className="text-small text-default-500">
            Manage password of this profile
          </p>
        </div>
        <Button
          color="danger"
          onPress={() => back()}
          disabled={isPendingMutateUpdateProfile}
        >
          <ArrowLeft className="h-4 w-4 text-white" />
          Back
        </Button>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdatePassword(onUpdate)}
        >
          <Controller
            name="oldPassword"
            control={controlUpdatePassword}
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("oldPassword")}
                    >
                      {visiblePassword.oldPassword ? (
                        <Eye className="pointer-profiles-none text-2xl text-default-400" />
                      ) : (
                        <EyeClosed className="pointer-profiles-none text-2xl text-default-400" />
                      )}
                    </button>
                  }
                  label="Current Password"
                  type={visiblePassword.oldPassword ? "text" : "password"}
                  variant="underlined"
                  autoComplete="off"
                  isInvalid={errorsUpdatePassword.oldPassword !== undefined}
                  errorMessage={errorsUpdatePassword.oldPassword?.message}
                />
              );
            }}
          />
          <Controller
            name="password"
            control={controlUpdatePassword}
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("password")}
                    >
                      {visiblePassword.password ? (
                        <Eye className="pointer-profiles-none text-2xl text-default-400" />
                      ) : (
                        <EyeClosed className="pointer-profiles-none text-2xl text-default-400" />
                      )}
                    </button>
                  }
                  label="Password"
                  type={visiblePassword.password ? "text" : "password"}
                  variant="underlined"
                  autoComplete="off"
                  isInvalid={errorsUpdatePassword.password !== undefined}
                  errorMessage={errorsUpdatePassword.password?.message}
                />
              );
            }}
          />
          <Controller
            name="confirmPassword"
            control={controlUpdatePassword}
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("confirmPassword")}
                    >
                      {visiblePassword.confirmPassword ? (
                        <Eye className="pointer-profiles-none text-2xl text-default-400" />
                      ) : (
                        <EyeClosed className="pointer-profiles-none text-2xl text-default-400" />
                      )}
                    </button>
                  }
                  label="Password Confirmation"
                  type={visiblePassword.confirmPassword ? "text" : "password"}
                  variant="underlined"
                  autoComplete="off"
                  isInvalid={errorsUpdatePassword.confirmPassword !== undefined}
                  errorMessage={errorsUpdatePassword.confirmPassword?.message}
                />
              );
            }}
          />
          <Button
            color="danger"
            className="mt-2 bg-gradient-to-r from-blue-600 to-purple-600 font-medium disabled:bg-default-500"
            type="submit"
            disabled={isPendingMutateUpdateProfile}
          >
            {isPendingMutateUpdateProfile && (
              <Spinner size="sm" color="white" />
            )}
            Save Changes
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default ChangePasswordTab;
