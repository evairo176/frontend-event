import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import React, { Key, ReactNode, useCallback } from "react";
import { COLUMN_LIST_BANNER } from "./Banner.constants";
import useBanner from "./useBanner";
import { useRouter } from "next/router";
import AddBannerModal from "./AddBannerModal";
import Image from "next/image";
import DeleteBannerModal from "./DeleteBannerModal";
import ButtonAction from "@/components/commons/ButtonAction";
import { convertUTCToLocal } from "@/utils/date";

type Props = {};

const Banner = (props: Props) => {
  const { push, query } = useRouter();

  const {
    dataBanner,
    isLoadingBanner,
    isRefetchingBanner,
    refetchBanner,
    selectedId,
    setSelectedId,
  } = useBanner();

  const renderCell = useCallback(
    (banner: Record<string, unknown>, columnKey: Key) => {
      const cellValue = banner[columnKey as keyof typeof banner];

      switch (columnKey) {
        case "isShow":
          return (
            <Chip
              size="sm"
              variant="flat"
              color={cellValue ? "success" : "warning"}
            >
              {cellValue === true ? "Show" : "Hide"}
            </Chip>
          );
        case "image":
          return (
            <Image
              className="aspect-video w-36 rounded-lg object-cover"
              src={`${cellValue}`}
              alt="image"
              width={200}
              height={100}
            />
          );
        case "createdAt":
          return `${convertUTCToLocal(cellValue as string)}`;
        case "updatedAt":
          return `${convertUTCToLocal(cellValue as string)}`;
        case "actions":
          return (
            <ButtonAction
              onPressButtonDetail={() => push(`/admin/banner/${banner.id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${banner.id}`);
                deleteBannerModal.onOpen();
              }}
            />
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );
  const addBannerModal = useDisclosure();
  const deleteBannerModal = useDisclosure();
  return (
    <section>
      {Object.keys(query)?.length > 0 && (
        <DataTable
          isLoading={isLoadingBanner || isRefetchingBanner}
          onClickButtonTopContent={() => addBannerModal.onOpen()}
          buttonTopContentLabel="Create Banner"
          renderCell={renderCell}
          columns={COLUMN_LIST_BANNER}
          totalPages={dataBanner?.pagination?.totalPages}
          totalData={dataBanner?.pagination?.total}
          emptyContent="Banner is empty"
          data={dataBanner?.data || []}
        />
      )}
      <AddBannerModal refetchBanner={refetchBanner} {...addBannerModal} />
      <DeleteBannerModal
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchBanner={refetchBanner}
        {...deleteBannerModal}
      />
    </section>
  );
};

export default Banner;
