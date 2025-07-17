import DataTable from "@/components/ui/DataTable";
import { useDisclosure } from "@heroui/react";
import React, { Key, ReactNode, useCallback } from "react";
import { COLUMN_LIST_CATEGORY } from "./Category.constants";
import useCategory from "./useCategory";
import { useRouter } from "next/router";
import AddCategoryModal from "./AddCategoryModal";
import Image from "next/image";
import DeleteCategoryModal from "./DeleteCategoryModal";
import ButtonAction from "@/components/commons/ButtonAction";
import { convertUTCToLocal } from "@/utils/date";

type Props = {};

const Category = (props: Props) => {
  const { push, query } = useRouter();

  const {
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,
    refetchCategory,
    selectedId,
    setSelectedId,
  } = useCategory();

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        case "icon":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
          );
        case "createdAt":
          return `${convertUTCToLocal(cellValue as string)}`;
        case "updatedAt":
          return `${convertUTCToLocal(cellValue as string)}`;
        case "actions":
          return (
            <ButtonAction
              onPressButtonDetail={() => push(`/admin/category/${category.id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${category.id}`);
                deleteCategoryModal.onOpen();
              }}
            />
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );
  const addCategoryModal = useDisclosure();
  const deleteCategoryModal = useDisclosure();
  return (
    <section>
      {Object.keys(query)?.length > 0 && (
        <DataTable
          isLoading={isLoadingCategory || isRefetchingCategory}
          onClickButtonTopContent={() => addCategoryModal.onOpen()}
          buttonTopContentLabel="Create Category"
          renderCell={renderCell}
          columns={COLUMN_LIST_CATEGORY}
          totalPages={dataCategory?.pagination?.totalPages}
          totalData={dataCategory?.pagination?.total}
          emptyContent="Category is empty"
          data={dataCategory?.data || []}
          refetch={refetchCategory}
        />
      )}
      <AddCategoryModal
        refetchCategory={refetchCategory}
        {...addCategoryModal}
      />
      <DeleteCategoryModal
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchCategory={refetchCategory}
        {...deleteCategoryModal}
      />
    </section>
  );
};

export default Category;
