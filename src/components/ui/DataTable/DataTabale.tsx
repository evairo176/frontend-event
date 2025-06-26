import { LIMIT_LIST } from "@/components/constants/list.constants";
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
  onClearSearch: () => void;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  buttonTopContentLabel?: string;
  onClickButtonTopContent?: () => void;
  limit?: string;
  totalPages: number;
  currentPage: number;
  onChangePage: (page: number) => void;
  onChangeLimit: (e: ChangeEvent<HTMLSelectElement>) => void;
  emptyContent: string;
};

const DataTabale = ({
  columns,
  data,
  renderCell,
  limit = "8",
  currentPage,
  totalPages,
  onChangePage,
  onClearSearch,
  onChangeSearch,
  onChangeLimit,
  buttonTopContentLabel,
  onClickButtonTopContent,
  emptyContent,
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
        <Select
          className="hidden max-w-36 lg:block"
          size="md"
          selectedKeys={[limit]}
          selectionMode="single"
          onChange={onChangeLimit}
          startContent={<p className="text-small">Show:</p>}
        >
          {LIMIT_LIST?.map((item) => {
            return (
              <SelectItem key={item.value} textValue={item.value}>
                {item.label}
              </SelectItem>
            );
          })}
        </Select>

        <Pagination
          isCompact
          showControls
          color="danger"
          page={currentPage}
          total={totalPages}
          onChange={onChangePage}
        />
      </div>
    );
  }, [limit, currentPage, totalPages, onChangePage]);

  return (
    <Table
      topContent={topContent}
      topContentPlacement="outside"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
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
        loadingContent={<Spinner label="Loading..." />}
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
