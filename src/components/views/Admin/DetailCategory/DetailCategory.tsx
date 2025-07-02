import { Tab, Tabs } from "@heroui/react";
import React from "react";
import IconTab from "./IconTab";
import InfoTab from "./InfoTab";
import useDetailCategory from "./useDetailCategory";

type Props = {};

const DetailCategory = (props: Props) => {
  const { dataCategory } = useDetailCategory();
  return (
    <div>
      <Tabs aria-label="options">
        <Tab key={"icon"} title="Icon">
          <IconTab currentIcon={dataCategory?.icon} />
        </Tab>
        <Tab key={"info"} title="Info">
          <InfoTab dataCategory={dataCategory} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default DetailCategory;
