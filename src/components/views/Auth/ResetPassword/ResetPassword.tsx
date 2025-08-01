import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import Image from "next/image";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import useResetPassword from "./useResetPassword";
import { ArrowLeft, Eye, EyeClosed, Frown } from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {};

const ResetPassword = (props: Props) => {
  const { query } = useRouter();
  const code = query?.code;
  const now = Date.now();
  const exp = Number(query?.exp);
  const isValid = code && exp && exp > now;

  const {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleResetPassword,
    isPendingResetPassword,
    errors,
    setValue,
  } = useResetPassword();

  useEffect(() => {
    if (code) {
      setValue("verificationCode", `${code}`);
    }
  }, [code]);

  return (
    <div className="h-auto w-full">
      <div className="flex h-full w-full items-center justify-center">
        <div className="mx-auto h-auto w-full max-w-[450px]">
          <Card className="flex w-full max-w-full items-center justify-center">
            <CardBody>
              {isValid ? (
                <div className="h-full w-full rounded-md p-5">
                  <Image
                    src="/images/general/logo.png"
                    alt="logo"
                    width={120}
                    height={80}
                    className="object-cover"
                  />

                  <h1 className="mb-1.5 mt-8 text-center text-xl font-bold tracking-[-0.16px] dark:text-[#fcfdffef] sm:text-left">
                    Set up a new password
                  </h1>
                  <p className="mb-6 text-center text-base font-normal dark:text-[#f1f7feb5] sm:text-left">
                    Your password must be different from your previous one.
                  </p>
                  <form onSubmit={handleSubmit(handleResetPassword)}>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => {
                        return (
                          <Input
                            {...field}
                            endContent={
                              <button
                                aria-label="toggle password visibility"
                                className="focus:outline-none"
                                type="button"
                                onClick={() =>
                                  handleVisiblePassword("password")
                                }
                              >
                                {visiblePassword.password ? (
                                  <Eye className="pointer-events-none text-2xl text-default-400" />
                                ) : (
                                  <EyeClosed className="pointer-events-none text-2xl text-default-400" />
                                )}
                              </button>
                            }
                            label="Password"
                            type={
                              visiblePassword.password ? "text" : "password"
                            }
                            variant="underlined"
                            autoComplete="off"
                            isInvalid={errors.password !== undefined}
                            errorMessage={errors.password?.message}
                          />
                        );
                      }}
                    />
                    <Controller
                      name="confirmPassword"
                      control={control}
                      render={({ field }) => {
                        return (
                          <Input
                            {...field}
                            endContent={
                              <button
                                aria-label="toggle password visibility"
                                className="focus:outline-none"
                                type="button"
                                onClick={() =>
                                  handleVisiblePassword("confirmPassword")
                                }
                              >
                                {visiblePassword.confirmPassword ? (
                                  <Eye className="pointer-events-none text-2xl text-default-400" />
                                ) : (
                                  <EyeClosed className="pointer-events-none text-2xl text-default-400" />
                                )}
                              </button>
                            }
                            label="Password Confirmation"
                            type={
                              visiblePassword.confirmPassword
                                ? "text"
                                : "password"
                            }
                            variant="underlined"
                            autoComplete="off"
                            isInvalid={errors.confirmPassword !== undefined}
                            errorMessage={errors.confirmPassword?.message}
                          />
                        );
                      }}
                    />

                    <Button
                      className="mt-4"
                      color="danger"
                      variant="shadow"
                      fullWidth
                      type="submit"
                      disabled={isPendingResetPassword}
                    >
                      {isPendingResetPassword && <Spinner size="sm" />}
                      Update password
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="flex w-full flex-col items-center justify-center gap-2 rounded-md py-4">
                  <div className="size-[48px]">
                    <Frown
                      size="48px"
                      className="animate-bounce text-red-500"
                    />
                  </div>
                  <h2 className="text-xl font-bold tracking-[-0.16px] dark:text-[#fcfdffef]">
                    Invalid or expired reset link
                  </h2>
                  <p className="text-muted-foreground mb-2 text-center text-sm font-normal dark:text-[#f1f7feb5]">
                    You can request a new password reset link
                  </p>
                  <Link href="/forgot-password?email=">
                    <Button className="h-[40px]">
                      <ArrowLeft />
                      Go to forgot password
                    </Button>
                  </Link>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
