import DataTable from "@/components/ui/DataTable";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import { EllipsisVertical, Eye, Trash } from "lucide-react";
import React, { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_CATEGORY } from "./Category.constants";
import useCategory from "./useCategory";
import { useRouter } from "next/router";
import AddCategoryModal from "./AddCategoryModal";
import Image from "next/image";
import DeleteCategoryModal from "./DeleteCategoryModal";

type Props = {};

const Category = (props: Props) => {
  const { push, isReady, query } = useRouter();

  const {
    setUrl,
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,
    currentPage,
    currentLimit,
    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
    refetchCategory,
    selectedId,
    setSelectedId,
  } = useCategory();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        case "icon":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
          );
        case "actions":
          return (
            <div className="flex items-center gap-3">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => push(`/admin/category/${category.id}`)}
                className="bg-primary-100"
              >
                <Eye className="h-5 w-5 text-primary-500" />
              </Button>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => {
                  setSelectedId(`${category.id}`);
                  deleteCategoryModal.onOpen();
                }}
                className="bg-danger-100"
              >
                <Trash className="h-5 w-5 text-danger-500" />
              </Button>
            </div>
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
          onChangeLimit={handleChangeLimit}
          onChangePage={handleChangePage}
          onChangeSearch={handleSearch}
          onClearSearch={handleClearSearch}
          onClickButtonTopContent={() => addCategoryModal.onOpen()}
          buttonTopContentLabel="Create Category"
          renderCell={renderCell}
          columns={COLUMN_LIST_CATEGORY}
          limit={String(currentLimit)}
          totalPages={dataCategory?.pagination?.totalPages}
          totalData={dataCategory?.pagination?.total}
          currentPage={Number(currentPage)}
          emptyContent="Category is empty"
          data={dataCategory?.data || []}
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
