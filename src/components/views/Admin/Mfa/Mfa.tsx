import React, { useCallback, useState } from "react";
import useMfa from "./useMfa";
import useProfile from "../Profile/useProfile";
import { Button, useDisclosure } from "@heroui/react";

import EnableMfaModal from "./EnableMfaModal";
import RevokeMfa from "./RevokeMfa";

type Props = {};

const Mfa = (props: Props) => {
  const [showKey, setShowKey] = useState(false);

  const [copied, setCopied] = useState(false);
  const { dataMfaSetup, isLoadingMfaSetup } = useMfa();

  const { dataProfile, refetchProfile } = useProfile();

  const onCopy = useCallback((value: string) => {
    navigator.clipboard.writeText(value);

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }, []);

  const enableMfaModal = useDisclosure();
  return (
    <>
      <div className="via-root to-root rounded-xl bg-gradient-to-r p-0.5">
        <div className="rounded-[10px] p-2">
          <div className="flex items-center gap-3">
            <h3 className="text-slate-12 mb-1 text-xl font-bold tracking-[-0.16px]">
              Multi-Factor Authentication (MFA)
            </h3>
            {dataProfile?.userPreferences.enable2FA && (
              <span className="flex h-6 select-none flex-row items-center justify-center gap-1 whitespace-nowrap rounded bg-green-100 px-2 text-xs font-medium text-green-500">
                Enabled
              </span>
            )}
          </div>
          <p className="mb-6 text-sm font-normal text-[#0007149f] dark:text-gray-100">
            Protect your account by adding an extra layer of security.
          </p>

          {dataProfile?.userPreferences?.enable2FA ? (
            <RevokeMfa refetchProfile={refetchProfile} />
          ) : (
            <Button
              disabled={isLoadingMfaSetup}
              onPress={() => enableMfaModal.onOpen()}
            >
              Enable MFA
            </Button>
          )}
        </div>
      </div>
      <EnableMfaModal
        {...enableMfaModal}
        dataMfaSetup={dataMfaSetup}
        isLoadingMfaSetup={isLoadingMfaSetup}
        showKey={showKey}
        setShowKey={setShowKey}
        copied={copied}
        onCopy={onCopy}
        refetchProfile={refetchProfile}
      />
    </>
  );
};

export default Mfa;
