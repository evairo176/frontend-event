"use client";
import {
  Button,
  Card,
  CardBody,
  Input,
  Spinner,
  Tab,
  Tabs,
} from "@heroui/react";
import { Eye, EyeClosed, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useRegister from "./useRegister";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";
import MemberTab from "./MemberTab";
import CompanyTab from "./CompanyTab";

type Props = {};

const Register = (props: Props) => {
  const { errors } = useRegister();

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
          <h2 className="text-xl font-bold text-danger">
            Create account for member / company
          </h2>
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
          <Tabs fullWidth>
            <Tab key={"member"} title="Member">
              <MemberTab />
            </Tab>
            <Tab key={"company"} title="Personal atau Perusahaan">
              <CompanyTab />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
