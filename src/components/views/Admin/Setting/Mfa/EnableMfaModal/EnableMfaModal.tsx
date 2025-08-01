import {
  Button,
  InputOtp,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { Check, Copy } from "lucide-react";
import React, { useEffect } from "react";
import useMfa from "../useMfa";
import { Controller } from "react-hook-form";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  dataMfaSetup: {
    qrImageUrl: string;
    secret: string;
  };
  isLoadingMfaSetup: boolean;
  showKey: boolean;
  copied: boolean;
  setShowKey: (value: boolean) => void;
  onCopy: (value: string) => void;
  refetchProfile: () => void;
};

const EnableMfaModal = ({
  isOpen = false,
  onClose,
  onOpenChange,
  dataMfaSetup,
  isLoadingMfaSetup,
  showKey,
  setShowKey,
  copied,
  onCopy,
  refetchProfile,
}: Props) => {
  const {
    control,
    handleSubmit,
    handleVerifyMfa,
    isPendingVerifyMfa,
    isSuccessVerifyMfa,
    errors,
    setValue,
    reset,
  } = useMfa();

  useEffect(() => {
    if (dataMfaSetup) {
      setValue("secretKey", `${dataMfaSetup?.secret}`);
    }
  }, [dataMfaSetup]);

  useEffect(() => {
    if (isSuccessVerifyMfa) {
      onClose();
      refetchProfile();
    }
  }, [isSuccessVerifyMfa]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => {
        // handleOnClose()
        onClose();
        reset();
      }}
    >
      <form onSubmit={handleSubmit(handleVerifyMfa)}>
        <ModalContent className="m-4">
          <ModalHeader>
            <div className="text-slate-12 text-[17px] font-semibold">
              Setup Multi-Factor Authentication
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="">
              <p className="mt-6 text-sm font-bold text-[#0007149f] dark:text-inherit">
                Scan the QR code
              </p>
              <span className="text-sm font-normal text-[#0007149f] dark:text-inherit">
                Use an app like{" "}
                <a
                  className="hover:decoration-blue-11 dark:decoration-slate-9 !text-primary underline decoration-primary decoration-1 underline-offset-2 transition duration-200 ease-in-out dark:text-current dark:hover:decoration-current"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://support.1password.com/one-time-passwords/"
                >
                  1Password
                </a>{" "}
                or{" "}
                <a
                  className="hover:decoration-blue-11 dark:decoration-slate-9 !text-primary underline decoration-primary decoration-1 underline-offset-2 transition duration-200 ease-in-out dark:text-current dark:hover:decoration-current"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://safety.google/authentication/"
                >
                  Google Authenticator
                </a>{" "}
                to scan the QR code below.
              </span>
            </div>
            <div className="mt-4 flex flex-row items-center gap-4">
              <div className="shrink-0 rounded-md border border-[#0009321f] bg-white p-2 dark:border-gray-600">
                {isLoadingMfaSetup || !dataMfaSetup?.qrImageUrl ? (
                  <Skeleton className="h-[160px] w-[160px]" />
                ) : (
                  <img
                    alt="QR code"
                    decoding="async"
                    width="160"
                    height="160"
                    className="rounded-md"
                    src={dataMfaSetup.qrImageUrl}
                  />
                )}
              </div>

              {showKey ? (
                <div className="w-full">
                  <div className="dark:text-muted-foreground flex items-center gap-1 text-sm font-normal text-[#0007149f]">
                    <span>Copy setup key</span>
                    <Button
                      onPress={() => onCopy(dataMfaSetup.secret)}
                      isIconOnly
                      size="sm"
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="dark:text-muted-foreground block w-[200px] truncate text-sm text-black">
                    {dataMfaSetup.secret}
                  </p>
                </div>
              ) : (
                <span className="dark:text-muted-foreground text-sm font-normal text-[#0007149f]">
                  Cant scan the code?
                  <button
                    className="block text-primary transition duration-200 ease-in-out hover:underline dark:text-white"
                    type="button"
                    onClick={() => setShowKey(true)}
                  >
                    View the Setup Key
                  </button>
                </span>
              )}
            </div>

            <div className="mt-8 border-t">
              <Controller
                control={control}
                name="code"
                render={({ field }) => (
                  <InputOtp
                    {...field}
                    errorMessage={errors.code && errors.code.message}
                    isInvalid={!!errors.code}
                    length={6}
                  />
                )}
                rules={{
                  required: "OTP is required",
                  minLength: {
                    value: 6,
                    message: "Please enter a valid OTP",
                  },
                }}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => {
                // handleOnClose(onClose)
                reset();
                onClose();
              }}
              //   disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 font-medium"
              color="danger"
              type="submit"
              disabled={isPendingVerifyMfa}
            >
              {isPendingVerifyMfa ? (
                <Spinner size="sm" color="white" />
              ) : (
                " Verify"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default EnableMfaModal;
