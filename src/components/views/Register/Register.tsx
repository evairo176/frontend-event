"use client";
import { Button, Card, CardBody, Input } from "@heroui/react";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useRegister from "./useRegister";

type Props = {};

const Register = (props: Props) => {
  const { visiblePassword, handleVisiblePassword } = useRegister();

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
            <Link href={"/login"} className="font-semibold text-danger">
              Login Here
            </Link>
          </p>
          <form className="flex w-80 flex-col space-y-4">
            <Input
              type="text"
              label="Fullname"
              variant="underlined"
              autoComplete="off"
            />
            <Input
              type="text"
              label="Username"
              variant="underlined"
              autoComplete="off"
            />
            <Input
              type="email"
              label="Email"
              variant="underlined"
              autoComplete="off"
            />
            <Input
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
            />
            <Input
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={() => handleVisiblePassword("passwordConfirmation")}
                >
                  {visiblePassword.passwordConfirmation ? (
                    <Eye className="pointer-events-none text-2xl text-default-400" />
                  ) : (
                    <EyeClosed className="pointer-events-none text-2xl text-default-400" />
                  )}
                </button>
              }
              label="Password Confirmation"
              type={visiblePassword.passwordConfirmation ? "text" : "password"}
              variant="underlined"
              autoComplete="off"
            />
            <Button color="danger" size="lg" type="submit">
              Register
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
