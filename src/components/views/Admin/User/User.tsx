import DataTable from "@/components/ui/DataTable";

import React, { Key, ReactNode, useCallback } from "react";
import { useRouter } from "next/router";
import ButtonAction from "@/components/commons/ButtonAction";
import { convertUTCToLocal } from "@/utils/date";
import useUser from "./useUser";
import { COLUMN_LIST_USER } from "./User.constants";
import { Chip, Switch, useDisclosure } from "@heroui/react";
import SwitchAction from "@/components/commons/SwitchAction";
import ActivatedUserRadio from "./ActivatedUserRadio";

type Props = {};

const User = (props: Props) => {
  const { push, query } = useRouter();

  const {
    dataUser,
    isLoadingUser,
    isRefetchingUser,
    refetchUser,
    selectedId,
    setSelectedId,
    defaultValue,
    setDefaultValue,
    name,
    setName,
  } = useUser();

  const renderCell = useCallback(
    (user: Record<string, unknown>, columnKey: Key) => {
      const cellValue = user[columnKey as keyof typeof user];

      switch (columnKey) {
        // case "icon":
        //   return (
        //     <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
        //   );
        case "status":
          let Status = (
            <Chip color="secondary" variant="dot">
              NORMAL
            </Chip>
          );
          if (cellValue === "PENDING_APPROVAL") {
            Status = (
              <Chip color="warning" variant="dot">
                PENDING APPROVAL
              </Chip>
            );
          }
          if (cellValue === "APPROVE") {
            Status = (
              <Chip color="success" variant="dot">
                APPROVE
              </Chip>
            );
          }

          if (cellValue === "REJECT") {
            Status = (
              <Chip color="danger" variant="dot">
                REJECT
              </Chip>
            );
          }
          return Status as ReactNode;
        case "companyId":
          let isCompany = (
            <Chip color="secondary" variant="solid">
              No
            </Chip>
          );
          if (cellValue) {
            isCompany = (
              <Chip color="success" variant="solid">
                Yes
              </Chip>
            );
          }

          return isCompany as ReactNode;
        case "activate":
          const isActive = user.status === "APPROVE" ? true : false;

          if (user.status === "NORMAL") {
            return null;
          }
          return (
            <SwitchAction
              currentValue={isActive}
              onPressButtonActivate={() => {
                setName(`${user.fullname}`);
                setDefaultValue(isActive);
                setSelectedId(`${user.id}`);
                updateActivatedModal.onOpen();
              }}
            />
          );
        case "createdAt":
          return `${convertUTCToLocal(cellValue as string)}`;
        case "updatedAt":
          return `${convertUTCToLocal(cellValue as string)}`;
        case "actions":
          return (
            <ButtonAction
              onPressButtonDetail={() => push(`/admin/user/${user.id}`)}
            />
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );
  const updateActivatedModal = useDisclosure();
  //   const deleteuserModal = useDisclosure();
  return (
    <section>
      {Object.keys(query)?.length > 0 && (
        <DataTable
          isLoading={isLoadingUser || isRefetchingUser}
          renderCell={renderCell}
          columns={COLUMN_LIST_USER}
          totalPages={dataUser?.pagination?.totalPages}
          totalData={dataUser?.pagination?.total}
          emptyContent="user is empty"
          data={dataUser?.data || []}
          refetch={refetchUser}
        />
      )}
      <ActivatedUserRadio
        refetchUser={refetchUser}
        {...updateActivatedModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        defaultValue={defaultValue as boolean}
        confirmText="Confirm"
        cancelText="Cancel"
        userName={name}
      />
      {/* <DeleteuserModal
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchuser={refetchuser}
        {...deleteuserModal}
      /> */}
    </section>
  );
};

export default User;
