import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import { ArrowRight, MailCheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useForgotPassword from "./useForgotPassword";
import { Controller } from "react-hook-form";
import { useRouter } from "next/router";

type Props = {};

const ForgotPassword = (props: Props) => {
  const [isSubmit, setIsSubmit] = useState(true);
  const [email, setEmail] = useState("dwdw@gmail.com");
  const { query } = useRouter();

  const {
    handleForgotPassword,
    isPendingForgotPassword,
    handleSubmit,
    control,
    errors,
    isSuccessForgotPassword,
  } = useForgotPassword();

  return (
    <div className="h-auto w-full">
      <div className="flex h-full w-full items-center justify-center">
        <div className="mx-auto h-auto w-full max-w-[450px]">
          <Card className="flex w-full max-w-full items-center justify-center">
            <CardBody>
              {!isSuccessForgotPassword ? (
                <div className="h-full w-full rounded-md p-5">
                  <Image
                    src="/images/general/logo.png"
                    alt="logo"
                    width={120}
                    height={80}
                    className="object-cover"
                  />

                  <h1 className="mb-1.5 mt-8 text-center text-xl font-bold tracking-[-0.16px] dark:text-[#fcfdffef] sm:text-left">
                    Reset password
                  </h1>
                  <p className="mb-6 text-center text-base font-normal dark:text-[#f1f7feb5] sm:text-left">
                    Include the email address associated with your account and
                    we’ll send you an email with instructions to reset your
                    password.
                  </p>
                  <form onSubmit={handleSubmit(handleForgotPassword)}>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => {
                        return (
                          <Input
                            {...field}
                            autoFocus
                            type="text"
                            label="Email"
                            variant="underlined"
                            autoComplete="off"
                            className="mb-2"
                            placeholder="abcdefg@gmail.com"
                            isInvalid={errors.email !== undefined}
                            errorMessage={errors.email?.message}
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
                      disabled={isPendingForgotPassword}
                    >
                      {isPendingForgotPassword && <Spinner size="sm" />} Send
                      reset
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="flex w-full flex-col items-center justify-center gap-2 rounded-md py-4">
                  <div className="size-[48px]">
                    <MailCheckIcon size="48px" className="animate-bounce" />
                  </div>
                  <h2 className="text-xl font-bold tracking-[-0.16px] dark:text-[#fcfdffef]">
                    Check your email
                  </h2>
                  <p className="text-muted-foreground mb-2 text-center text-sm font-normal dark:text-[#f1f7feb5]">
                    We just sent a password reset link to {query?.email}.
                  </p>
                  <Link href="/">
                    <Button className="h-[40px]">
                      Go to login
                      <ArrowRight />
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

export default ForgotPassword;
