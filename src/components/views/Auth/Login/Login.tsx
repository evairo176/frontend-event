"use client";
import {
  Button,
  Card,
  CardBody,
  Input,
  InputOtp,
  Spinner,
} from "@heroui/react";
import { Eye, EyeClosed, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";
import useLogin from "./useLogin";

type Props = {};

const Login = (props: Props) => {
  const {
    isVisible,
    toggleVisibility,
    handleSubmit,
    // handleLogin,
    control,
    errors,
    handleLoginService,
    mfaRequired,
    isSubmitting,
  } = useLogin();

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
          <h2 className="text-xl font-bold text-danger">Login account</h2>
          <p className="mb-4 text-small text-gray-500">
            Don{"'"}t have an account?&nbsp;
            <Link href={"/auth/register"} className="font-semibold text-danger">
              Register Here
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
            onSubmit={handleSubmit(handleLoginService)}
          >
            <Controller
              name="identifier"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="text"
                    label="Email or Username"
                    variant="underlined"
                    autoComplete="off"
                    isInvalid={errors.identifier !== undefined}
                    errorMessage={errors.identifier?.message}
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
                        onClick={() => toggleVisibility()}
                      >
                        {isVisible ? (
                          <Eye className="pointer-events-none text-2xl text-default-400" />
                        ) : (
                          <EyeClosed className="pointer-events-none text-2xl text-default-400" />
                        )}
                      </button>
                    }
                    label="Password"
                    type={isVisible ? "text" : "password"}
                    variant="underlined"
                    autoComplete="off"
                    isInvalid={errors.password !== undefined}
                    errorMessage={errors.password?.message}
                  />
                );
              }}
            />
            {mfaRequired && (
              <>
                <Controller
                  control={control}
                  name="code"
                  render={({ field }) => (
                    <div>
                      <p className="mb-2 p-0 text-xs text-gray-600">
                        Masukan code OTP authenticator
                      </p>
                      <InputOtp
                        {...field}
                        errorMessage={errors.code && errors.code.message}
                        isInvalid={!!errors.code}
                        length={6}
                      />
                    </div>
                  )}
                  rules={{
                    required: "OTP is required",
                    minLength: {
                      value: 6,
                      message: "Please enter a valid OTP",
                    },
                  }}
                />
              </>
            )}
            <Link href={"/auth/forgot-password"}>
              <p className="text-sm">Forgot password?</p>
            </Link>

            <Button
              disabled={isSubmitting}
              color="danger"
              size="lg"
              type="submit"
            >
              {isSubmitting && <Spinner color="white" size="sm" />}
              Login
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
