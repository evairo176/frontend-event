import { LIMIT_LIST } from "@/components/constants/list.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import { cn } from "@/utils/cn";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  SortDescriptor,
} from "@heroui/react";
import { Search } from "lucide-react";
import React, { ChangeEvent, Key, ReactNode, useMemo, useState } from "react";

type Props = {
  columns: { uid: string; name: string; sort?: boolean }[];
  data: Record<string, unknown>[];
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;

  buttonTopContentLabel?: string;
  onClickButtonTopContent?: () => void;
  totalPages: number;
  totalData: number;
  emptyContent: string;
  isLoading: boolean;
};

const DataTable = ({
  columns,
  data,
  renderCell,
  totalPages,
  totalData,
  buttonTopContentLabel,
  onClickButtonTopContent,
  emptyContent,
  isLoading,
}: Props) => {
  const {
    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
    currentLimit,
    currentPage,
  } = useChangeUrl();
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "",
    direction: "ascending",
  });

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col-reverse items-start justify-between gap-y-4 lg:flex-row lg:items-center">
        <Input
          isClearable
          className="w-full sm:max-w-[24%]"
          placeholder="search..."
          startContent={<Search className="h-4 w-4" />}
          onClear={handleClearSearch}
          onChange={handleSearch}
        />
        {buttonTopContentLabel && (
          <Button color="danger" onPress={onClickButtonTopContent}>
            {buttonTopContentLabel}
          </Button>
        )}
      </div>
    );
  }, [
    buttonTopContentLabel,
    handleSearch,
    handleClearSearch,
    onClickButtonTopContent,
  ]);

  const sortedData = useMemo(() => {
    if (!sortDescriptor.column) return data;

    const sorted = [...data].sort((a, b) => {
      const aValue = a[sortDescriptor.column as string];
      const bValue = b[sortDescriptor.column as string];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDescriptor.direction === "ascending"
          ? aValue - bValue
          : bValue - aValue;
      }

      return sortDescriptor.direction === "ascending"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

    return sorted;
  }, [data, sortDescriptor]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center px-2 py-2 lg:justify-between">
        <div className="flex flex-row items-center justify-between gap-3">
          <Select
            className="hidden w-full max-w-36 lg:block"
            size="md"
            selectedKeys={[String(currentLimit)]}
            selectionMode="single"
            onChange={handleChangeLimit}
            startContent={<p className="text-small">Show:</p>}
            disallowEmptySelection
          >
            {LIMIT_LIST?.map((item) => {
              return (
                <SelectItem key={item.value} textValue={item.value}>
                  {item.label}
                </SelectItem>
              );
            })}
          </Select>

          <div className="w-[200px]">
            <p className="text-sm text-gray-400">
              {currentLimit} of {totalData || "-"} row(s)
            </p>
          </div>
        </div>
        {totalPages > 0 && (
          <Pagination
            isCompact
            showControls
            color="danger"
            page={Number(currentPage)}
            total={totalPages}
            onChange={handleChangePage}
            loop
          />
        )}
      </div>
    );
  }, [
    currentLimit,
    currentPage,
    totalPages,
    handleChangePage,
    handleChangeLimit,
    totalPages,
  ]);

  return (
    <Table
      aria-label="Data table with sorting"
      topContent={topContent}
      topContentPlacement="outside"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      classNames={{
        base: "max-w-full",
        wrapper: cn({ "overflow-x-hidden": isLoading }),
      }}
    >
      <TableHeader columns={columns}>
        {(column) => {
          return (
            <TableColumn key={column.uid} allowsSorting={column.sort ?? false}>
              {column.name}
            </TableColumn>
          );
        }}
      </TableHeader>
      <TableBody
        emptyContent={emptyContent}
        items={sortedData}
        isLoading={isLoading}
        loadingContent={
          <div className="flex h-full w-full items-center justify-center bg-foreground-700/30 backdrop-blur-sm">
            <Spinner label="Loading..." />
          </div>
        }
      >
        {(item) => (
          <TableRow key={item.id as Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
