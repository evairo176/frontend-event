import { LIMIT_LIST } from "@/components/constants/list.constants";
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
} from "@heroui/react";
import { Search } from "lucide-react";
import React, { ChangeEvent, Key, ReactNode, useMemo } from "react";

type Props = {
  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;

  buttonTopContentLabel?: string;
  onClickButtonTopContent?: () => void;
  limit?: string;
  totalPages: number;
  currentPage: number;
  totalData: number;
  onChangePage: (page: number) => void;
  onChangeLimit: (e: ChangeEvent<HTMLSelectElement>) => void;
  onClearSearch: () => void;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  emptyContent: string;
  isLoading: boolean;
};

const DataTabale = ({
  columns,
  data,
  renderCell,
  limit = "8",
  currentPage,
  totalPages,
  totalData,
  onChangePage,
  onClearSearch,
  onChangeSearch,
  onChangeLimit,
  buttonTopContentLabel,
  onClickButtonTopContent,
  emptyContent,
  isLoading,
}: Props) => {
  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col-reverse items-start justify-between gap-y-4 lg:flex-row lg:items-center">
        <Input
          isClearable
          className="w-full sm:max-w-[24%]"
          placeholder="search..."
          startContent={<Search className="h-4 w-4" />}
          onClear={onClearSearch}
          onChange={onChangeSearch}
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
    onChangeSearch,
    onClearSearch,
    onClickButtonTopContent,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center px-2 py-2 lg:justify-between">
        <div className="flex flex-row items-center justify-between gap-3">
          <Select
            className="hidden w-full max-w-36 lg:block"
            size="md"
            selectedKeys={[limit]}
            selectionMode="single"
            onChange={onChangeLimit}
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
              {limit} of {totalData || "-"} row(s)
            </p>
          </div>
        </div>
        {totalPages > 0 && (
          <Pagination
            isCompact
            showControls
            color="danger"
            page={currentPage}
            total={totalPages}
            onChange={onChangePage}
            loop
          />
        )}
      </div>
    );
  }, [limit, currentPage, totalPages, onChangePage, onChangeLimit]);

  return (
    <Table
      topContent={topContent}
      topContentPlacement="outside"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        base: "max-w-full",
        wrapper: cn({ "overflow-x-hidden": isLoading }),
      }}
    >
      <TableHeader columns={columns}>
        {(column) => {
          return (
            <TableColumn
              key={column.uid as Key}
              allowsSorting={column.sort as boolean}
            >
              {column.name as string}
            </TableColumn>
          );
        }}
      </TableHeader>
      <TableBody
        emptyContent={emptyContent}
        items={data}
        isLoading={isLoading}
        loadingContent={
          <div className="flex h-full w-full items-center justify-center bg-foreground-700/30 backdrop-blur-sm">
            <Spinner label="Loading..." />
          </div>
        }
      >
        {(item) => {
          return (
            <TableRow key={item.id as Key}>
              {(columnKey) => {
                return <TableCell>{renderCell(item, columnKey)}</TableCell>;
              }}
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
};

export default DataTabale;
