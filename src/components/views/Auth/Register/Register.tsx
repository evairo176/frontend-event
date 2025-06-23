"use client";
import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import { Eye, EyeClosed, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useRegister from "./useRegister";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

type Props = {};

const Register = (props: Props) => {
  const {
    visiblePassword,
    handleVisiblePassword,
    handleSubmit,
    handleRegister,
    control,
    errors,
    isPendingRegister,
  } = useRegister();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 py-10 lg:flex-row lg:gap-20 lg:py-0">
      <div className="flex w-full flex-col items-center justify-center gap-10 lg:w-1/3">
        <Image
          alt="logo"
          src={"/images/general/logo.svg"}
          width={180}
          height={180}
        />
        <Image
          alt="logo login"
          src={"/images/illustration/login.svg"}
          width={1024}
          height={1024}
          className="w-2/3 lg:w-full"
        />
      </div>
      <Card className="p-8">
        <CardBody>
          <h2 className="text-xl font-bold text-danger">Create account</h2>
          <p className="mb-4 text-small text-gray-500">
            Have an account?&nbsp;
            <Link href={"/auth/login"} className="font-semibold text-danger">
              Login Here
            </Link>
          </p>
          {errors.root && (
            <div className="mb-4 rounded-md bg-red-100 p-4 text-red-800">
              <p className="text-sm">{errors.root.message}</p>
            </div>
          )}
          <form
            className={cn(
              "flex w-80 flex-col",
              Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
            )}
            onSubmit={handleSubmit(handleRegister)}
          >
            <Controller
              name="fullname"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="text"
                    label="Fullname"
                    variant="underlined"
                    autoComplete="off"
                    isInvalid={errors.fullname !== undefined}
                    errorMessage={errors.fullname?.message}
                  />
                );
              }}
            />
            <Controller
              name="username"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="text"
                    label="Username"
                    variant="underlined"
                    autoComplete="off"
                    isInvalid={errors.username !== undefined}
                    errorMessage={errors.username?.message}
                  />
                );
              }}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="email"
                    label="Email"
                    variant="underlined"
                    autoComplete="off"
                    isInvalid={errors.email !== undefined}
                    errorMessage={errors.email?.message}
                  />
                );
              }}
            />
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
                        onClick={() => handleVisiblePassword("password")}
                      >
                        {visiblePassword.password ? (
                          <Eye className="pointer-events-none text-2xl text-default-400" />
                        ) : (
                          <EyeClosed className="pointer-events-none text-2xl text-default-400" />
                        )}
                      </button>
                    }
                    label="Password"
                    type={visiblePassword.password ? "text" : "password"}
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
                        onClick={() => handleVisiblePassword("confirmPassword")}
                      >
                        {visiblePassword.confirmPassword ? (
                          <Eye className="pointer-events-none text-2xl text-default-400" />
                        ) : (
                          <EyeClosed className="pointer-events-none text-2xl text-default-400" />
                        )}
                      </button>
                    }
                    label="Password Confirmation"
                    type={visiblePassword.confirmPassword ? "text" : "password"}
                    variant="underlined"
                    autoComplete="off"
                    isInvalid={errors.confirmPassword !== undefined}
                    errorMessage={errors.confirmPassword?.message}
                  />
                );
              }}
            />

            <Button
              disabled={isPendingRegister}
              color="danger"
              size="lg"
              type="submit"
            >
              {isPendingRegister && <Spinner color="white" size="sm" />}
              Register
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
