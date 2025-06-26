import DataTabale from "@/components/ui/DataTable";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Key, ReactNode, useCallback } from "react";
import { COLUMN_LIST_CATEGORY } from "./Category.constants";
import { LIMIT_LIST } from "@/components/constants/list.constants";

type Props = {};

const Category = (props: Props) => {
  const { push } = useRouter();
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
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <EllipsisVertical className="h-5 w-5 text-default-700" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key={`detail-category`}
                  onPress={() => push(`/admin/category/${category.id}`)}
                >
                  Detail Category
                </DropdownItem>
                <DropdownItem
                  className="text-danger-500"
                  key={`delete-category`}
                >
                  Delete Category
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );
  return (
    <section>
      <DataTabale
        onChangeLimit={() => {}}
        onChangePage={() => {}}
        onChangeSearch={() => {}}
        onClearSearch={() => {}}
        onClickButtonTopContent={() => {}}
        buttonTopContentLabel="Create Category"
        renderCell={renderCell}
        columns={COLUMN_LIST_CATEGORY}
        limit={LIMIT_LIST[0].value}
        totalPages={100}
        currentPage={1}
        emptyContent="Category is empty"
        data={[
          {
            id: "928287347499",
            name: "Kebab Bogor",
            description: "ini kebab bogor",
            icon: "/images/general/logo.png",
          },
          {
            id: "92828734749349",
            name: "Kebab Bogor 2",
            description: "ini kebab bogor 2",
            icon: "/images/general/logo.png",
          },
        ]}
      />
    </section>
  );
};

export default Category;
