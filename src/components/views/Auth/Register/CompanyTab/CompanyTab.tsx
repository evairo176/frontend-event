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
    handleSubmit,
    handleRegister,
    control,
    errors,
    isPendingRegister,
  } = useRegister();
  return (
    <form
      className={cn(
        "flex flex-col",
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
  );
};

export default CompanyTab;
