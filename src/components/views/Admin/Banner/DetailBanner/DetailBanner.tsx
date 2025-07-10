import { Tab, Tabs } from "@heroui/react";
import React from "react";
import ImageTab from "./ImageTab";
import InfoTab from "./InfoTab";
import useDetailBanner from "./useDetailBanner";

type Props = {};

const DetailBanner = (props: Props) => {
  const {
    dataBanner,

    handleUpdateBanner,
    isPendingMutateUpdateBanner,
    isSuccessMutateUpdateBanner,
  } = useDetailBanner();
  return (
    <div>
      <Tabs aria-label="options">
        <Tab key={"image"} title="Image">
          <ImageTab
            currentImage={dataBanner?.image}
            onUpdate={handleUpdateBanner}
            isPendingMutateUpdateBanner={isPendingMutateUpdateBanner}
            isSuccessMutateUpdateBanner={isSuccessMutateUpdateBanner}
          />
        </Tab>
        <Tab key={"info"} title="Info">
          <InfoTab
            dataBanner={dataBanner}
            onUpdate={handleUpdateBanner}
            isPendingMutateUpdateBanner={isPendingMutateUpdateBanner}
            isSuccessMutateUpdateBanner={isSuccessMutateUpdateBanner}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default DetailBanner;
