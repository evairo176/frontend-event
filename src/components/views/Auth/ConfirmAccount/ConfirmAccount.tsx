"use client";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  status: "success" | "failed";
};

const ConfirmAccount = (props: Props) => {
  const router = useRouter();
  const { status } = props;

  return (
    <div className="flex w-screen flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          alt="logo"
          src={"/images/general/logo.svg"}
          width={180}
          height={180}
        />
        <Image
          alt="success"
          src={
            status === "success"
              ? "/images/illustration/success.svg"
              : "/images/illustration/pending.svg"
          }
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col items-center text-center">
        {status === "success" ? (
          <>
            <h1 className="text-3xl font-bold text-danger-500">
              Create account success
            </h1>
            <p className="text-xl font-bold text-gray-400">
              Check your email to verify your account
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-danger-500">
              Activation Failed
            </h1>
            <p className="text-xl font-bold text-gray-400">
              Confirmation code is invalid{" "}
            </p>
          </>
        )}
        <Button
          onPress={() => router.replace("/")}
          className="mt-4 w-fit"
          variant="bordered"
          color="danger"
        >
          Back to home
        </Button>
      </div>
    </div>
  );
};

export default ConfirmAccount;
