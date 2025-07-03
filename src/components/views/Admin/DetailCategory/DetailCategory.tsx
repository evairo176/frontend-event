import { Button, Tab, Tabs } from "@heroui/react";
import React from "react";
import IconTab from "./IconTab";
import InfoTab from "./InfoTab";
import useDetailCategory from "./useDetailCategory";

type Props = {};

const DetailCategory = (props: Props) => {
  const {
    dataCategory,

    handleUpdateCategory,
    isPendingMutateUpdateCategory,
    isSuccessMutateUpdateCategory,
  } = useDetailCategory();
  return (
    <div>
      <Tabs aria-label="options">
        <Tab key={"icon"} title="Icon">
          <IconTab
            currentIcon={dataCategory?.icon}
            onUpdate={handleUpdateCategory}
            isPendingMutateUpdateCategory={isPendingMutateUpdateCategory}
            isSuccessMutateUpdateCategory={isSuccessMutateUpdateCategory}
          />
        </Tab>
        <Tab key={"info"} title="Info">
          <InfoTab
            dataCategory={dataCategory}
            onUpdate={handleUpdateCategory}
            isPendingMutateUpdateCategory={isPendingMutateUpdateCategory}
            isSuccessMutateUpdateCategory={isSuccessMutateUpdateCategory}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default DetailCategory;
