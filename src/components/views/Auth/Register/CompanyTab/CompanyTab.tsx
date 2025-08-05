import React from "react";
import useRegister from "../useRegister";
import { cn } from "@/utils/cn";
import { Controller } from "react-hook-form";
import { Button, Input, Spinner } from "@heroui/react";
import { Eye, EyeClosed } from "lucide-react";

type Props = {};

const CompanyTab = (props: Props) => {
  const {
    visiblePassword,
    handleVisiblePassword,
    controlCompany,
    handleSubmitCompany,
    handleRegisterCompany,
    isPendingRegisterCompany,
    errorsCompany,
  } = useRegister();
  return (
    <form
      className={cn(
        "flex flex-col",
        Object.keys(errorsCompany).length > 0 ? "gap-2" : "gap-4",
      )}
      onSubmit={handleSubmitCompany(handleRegisterCompany)}
    >
      <Controller
        name="companyName"
        control={controlCompany}
        render={({ field }) => {
          return (
            <Input
              {...field}
              type="text"
              label="Enter your name company"
              variant="underlined"
              autoComplete="off"
              isInvalid={errorsCompany.fullname !== undefined}
              errorMessage={errorsCompany.fullname?.message}
            />
          );
        }}
      />
      <Controller
        name="fullname"
        control={controlCompany}
        render={({ field }) => {
          return (
            <Input
              {...field}
              type="text"
              label="Fullname"
              variant="underlined"
              autoComplete="off"
              isInvalid={errorsCompany.fullname !== undefined}
              errorMessage={errorsCompany.fullname?.message}
            />
          );
        }}
      />
      <Controller
        name="username"
        control={controlCompany}
        render={({ field }) => {
          return (
            <Input
              {...field}
              type="text"
              label="Username"
              variant="underlined"
              autoComplete="off"
              isInvalid={errorsCompany.username !== undefined}
              errorMessage={errorsCompany.username?.message}
            />
          );
        }}
      />
      <Controller
        name="email"
        control={controlCompany}
        render={({ field }) => {
          return (
            <Input
              {...field}
              type="email"
              label="Email"
              variant="underlined"
              autoComplete="off"
              isInvalid={errorsCompany.email !== undefined}
              errorMessage={errorsCompany.email?.message}
            />
          );
        }}
      />
      <Controller
        name="password"
        control={controlCompany}
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
              isInvalid={errorsCompany.password !== undefined}
              errorMessage={errorsCompany.password?.message}
            />
          );
        }}
      />
      <Controller
        name="confirmPassword"
        control={controlCompany}
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
              isInvalid={errorsCompany.confirmPassword !== undefined}
              errorMessage={errorsCompany.confirmPassword?.message}
            />
          );
        }}
      />

      <Button
        disabled={isPendingRegisterCompany}
        color="danger"
        size="lg"
        type="submit"
      >
        {isPendingRegisterCompany && <Spinner color="white" size="sm" />}
        Register your company
      </Button>
    </form>
  );
};

export default CompanyTab;
