import { Tab, Tabs } from "@heroui/react";
import React from "react";
import ProfileTab from "./ProfileTab";

import LocationTab from "./ChangePasswordTab";

import useProfile from "./useProfile";
import ChangePasswordTab from "./ChangePasswordTab";

type Props = {};

const Profile = (props: Props) => {
  const {
    dataProfile,
    handleUpdateInfoProfile,
    isSuccessMutateUpdateProfile,
    isPendingMutateUpdateProfile,

    handleUpdatePasswordProfile,
    isPendingMutateUpdatePassword,
    isSuccessMutateUpdatePassword,
  } = useProfile();
  console.log(dataProfile);
  return (
    <div>
      <Tabs aria-label="options">
        <Tab key={"profile"} title="Profile">
          <ProfileTab
            currentName={dataProfile?.fullname}
            currentProfile={dataProfile?.profilePicture as string}
            currentEmail={dataProfile?.email}
            currentUsername={dataProfile?.username}
            currentVerified={dataProfile?.isEmailVerified}
            currentRole={dataProfile?.role}
            onUpdate={handleUpdateInfoProfile}
            isPendingMutateUpdateProfile={isPendingMutateUpdateProfile}
            isSuccessMutateUpdateProfile={isSuccessMutateUpdateProfile}
          />
        </Tab>

        <Tab key={"changePassword"} title="Change Password">
          <ChangePasswordTab
            onUpdate={handleUpdatePasswordProfile}
            isPendingMutateUpdateProfile={isPendingMutateUpdatePassword}
            isSuccessMutateUpdateProfile={isSuccessMutateUpdatePassword}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Profile;
