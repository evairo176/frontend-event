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
  Card,
  CardBody,
  Chip,
} from "@heroui/react";
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  ArrowUpDown,
  Database,
  Eye,
  FileSpreadsheet,
} from "lucide-react";
import React, { Key, ReactNode, useMemo, useState } from "react";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import { convertUTCToLocal } from "@/utils/date";

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
  refetch: () => void;
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
  refetch,
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Add No column to the beginning of columns array
  const columnsWithNo = useMemo(() => {
    return [{ uid: "no", name: "No", sort: false }, ...columns];
  }, [columns]);

  // Export to Excel function
  const handleExportExcel = () => {
    setIsExporting(true);

    try {
      // Prepare data for export
      const exportData = sortedData.map((item, index) => {
        const row: Record<string, any> = {};

        // Add row number
        row["No"] =
          (Number(currentPage) - 1) * Number(currentLimit) + index + 1;

        // Add other columns data
        columns.forEach((column) => {
          const cellValue = item[column.uid];
          // Convert complex objects to string representation
          if (typeof cellValue === "object" && cellValue !== null) {
            row[column.name] = JSON.stringify(cellValue);
          } else {
            row[column.name] = cellValue || "";
          }
        });

        return row;
      });

      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);

      // Set column widths
      const colWidths = columnsWithNo.map((col) => ({ wch: 15 }));
      ws["!cols"] = colWidths;

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, "Data Export");

      // Generate filename with timestamp
      const timestamp = new Date().toISOString();
      const filename = `data-export-${convertUTCToLocal(timestamp).replace("_", ":")}.xlsx`;

      // Save file
      XLSX.writeFile(wb, filename);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setTimeout(() => setIsExporting(false), 1000);
    }
  };

  const handleRefresh = () => {
    const defaultValue = "8";

    const event = {
      target: { value: defaultValue },
    } as React.ChangeEvent<HTMLSelectElement>;
    setIsRefreshing(true);
    setTimeout(() => {
      refetch();
      handleChangePage(1);
      handleChangeLimit(event);
      handleClearSearch();
      setIsRefreshing(false);
    }, 1000);
  };

  const topContent = useMemo(() => {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        {/* Header Section */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 p-2">
              <Database className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Data Management
              </h3>
              <p className="text-sm text-gray-500">{totalData} total records</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Chip
              variant="flat"
              color={data.length > 0 ? "success" : "default"}
              startContent={<Eye className="h-3 w-3" />}
            >
              {data.length} visible
            </Chip>
          </div>
        </div>

        {/* Controls Section */}
        <Card className="border border-gray-200 shadow-sm">
          <CardBody className="p-4">
            <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
              {/* Search and Filters */}
              <div className="flex flex-1 flex-col gap-3 sm:flex-row">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="max-w-md flex-1"
                >
                  <Input
                    isClearable
                    placeholder="Search records..."
                    startContent={<Search className="h-4 w-4 text-gray-400" />}
                    onClear={handleClearSearch}
                    onChange={handleSearch}
                    classNames={{
                      input: "text-gray-700",
                      inputWrapper:
                        "bg-gray-50 border-gray-200 hover:border-blue-300 focus-within:border-blue-500 transition-colors",
                    }}
                  />
                </motion.div>

                {/* <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="flat"
                    startContent={<Filter className="h-4 w-4" />}
                    className="bg-gray-100 transition-colors hover:bg-gray-200"
                  >
                    Filters
                  </Button>
                </motion.div> */}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="flat"
                    isIconOnly
                    onPress={handleRefresh}
                    isLoading={isRefreshing}
                    className="bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100"
                  >
                    <RefreshCw
                      className={cn("h-4 w-4", isRefreshing && "animate-spin")}
                    />
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="flat"
                    onPress={handleExportExcel}
                    isLoading={isExporting}
                    className="gap-2 bg-green-50 text-green-600 transition-colors hover:bg-green-100"
                    startContent={
                      !isExporting && <FileSpreadsheet className="h-4 w-4" />
                    }
                  >
                    <span className="hidden sm:inline">
                      {isExporting ? "Exporting..." : "Export Excel"}
                    </span>
                    <span className="sm:hidden">
                      {isExporting ? "..." : "Excel"}
                    </span>
                  </Button>
                </motion.div>

                {buttonTopContentLabel && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      color="primary"
                      onPress={onClickButtonTopContent}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 font-medium"
                    >
                      {buttonTopContentLabel}
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    );
  }, [
    buttonTopContentLabel,
    handleSearch,
    handleClearSearch,
    onClickButtonTopContent,
    totalData,
    data.length,
    isRefreshing,
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-4"
      >
        <Card className="border border-gray-200 shadow-sm">
          <CardBody className="p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Left Section - Controls */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Select
                    className="w-full max-w-40"
                    size="sm"
                    selectedKeys={[String(currentLimit)]}
                    selectionMode="single"
                    onChange={handleChangeLimit}
                    startContent={
                      <p className="text-small font-medium">Show:</p>
                    }
                    disallowEmptySelection
                    classNames={{
                      trigger:
                        "bg-gray-50 border-gray-200 hover:border-blue-300 transition-colors",
                      value: "text-gray-700",
                    }}
                  >
                    {LIMIT_LIST?.map((item) => {
                      return (
                        <SelectItem key={item.value} textValue={item.value}>
                          {item.label}
                        </SelectItem>
                      );
                    })}
                  </Select>
                </motion.div>

                <div className="flex items-center gap-2">
                  <div className="h-4 w-px bg-gray-300"></div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Showing</span>
                    <Chip
                      variant="flat"
                      size="sm"
                      className="bg-blue-50 text-blue-700"
                    >
                      {data.length}
                    </Chip>
                    <span className="text-sm text-gray-500">of</span>
                    <Chip
                      variant="flat"
                      size="sm"
                      className="bg-purple-50 text-purple-700"
                    >
                      {totalData || 0}
                    </Chip>
                    <span className="text-sm text-gray-500">records</span>
                  </div>
                </div>
              </div>

              {/* Right Section - Pagination */}
              {totalPages > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Pagination
                    isCompact
                    showControls
                    color="primary"
                    page={Number(currentPage)}
                    total={totalPages}
                    onChange={handleChangePage}
                    loop
                    classNames={{
                      wrapper: "gap-2",
                      item: "bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 transition-all duration-200",
                      cursor: "bg-gradient-to-r from-blue-600 to-purple-600",
                    }}
                  />
                </motion.div>
              )}
            </div>
          </CardBody>
        </Card>
      </motion.div>
    );
  }, [
    currentLimit,
    currentPage,
    totalPages,
    handleChangePage,
    handleChangeLimit,
    totalData,
    data.length,
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="w-full"
    >
      <Card className="overflow-hidden rounded-xl border border-gray-200 p-2 shadow-lg lg:p-6">
        <Table
          aria-label="Interactive data table with sorting and animations"
          topContent={topContent}
          topContentPlacement="outside"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          classNames={{
            base: "max-w-full",
            wrapper: cn("shadow-none border-0 rounded-lg overflow-x-auto", {
              "overflow-y-hidden": isLoading,
            }),
            table: "min-h-[400px]",
            thead:
              "[&>tr]:first:shadow-none from-slate-100 via-gray-100 to-slate-100",
            tbody: "divide-y divide-gray-100 bg-white",
          }}
        >
          <TableHeader columns={columnsWithNo}>
            {(column) => {
              const isSortable = column.sort ?? false;
              const isCurrentSort = sortDescriptor.column === column.uid;

              return (
                <TableColumn
                  key={column.uid}
                  allowsSorting={isSortable}
                  className={cn(
                    // Base styling
                    "px-6 py-4 text-left",
                    "border-b-2 border-gray-200/80",
                    "text-xs font-bold uppercase tracking-wider",

                    // Background and colors
                    "bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100",
                    "text-slate-700",

                    // Hover effects
                    "transition-all duration-300 ease-in-out",
                    "hover:bg-gradient-to-br hover:from-blue-50 hover:via-indigo-50 hover:to-purple-50",
                    "hover:text-blue-800 hover:shadow-sm",

                    // Active/sorted state
                    isCurrentSort && [
                      "bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100",
                      "border-blue-300 text-blue-800",
                      "shadow-inner",
                    ],

                    // Sortable cursor
                    isSortable && "cursor-pointer select-none",

                    // First and last column styling
                    "first:rounded-tl-lg last:rounded-tr-lg",
                    "first:border-l-0 last:border-r-0",
                    // Prevent background overflow
                    "relative overflow-hidden",
                    // Prevent background overflow
                    "relative overflow-hidden",
                  )}
                >
                  <motion.div
                    className="flex items-center justify-between gap-3"
                    whileHover={isSortable ? { scale: 1.02 } : {}}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{column.name}</span>
                      {isCurrentSort && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-1.5 w-1.5 rounded-full bg-blue-500"
                        />
                      )}
                    </div>

                    {isSortable && (
                      <motion.div
                        animate={{
                          rotate:
                            isCurrentSort &&
                            sortDescriptor.direction === "descending"
                              ? 180
                              : 0,
                          scale: isCurrentSort ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={cn(
                          "flex-shrink-0 transition-colors duration-200",
                          isCurrentSort
                            ? "text-blue-600"
                            : "text-gray-400 group-hover:text-blue-500",
                        )}
                      >
                        <ArrowUpDown className="h-4 w-4" />
                      </motion.div>
                    )}
                  </motion.div>
                </TableColumn>
              );
            }}
          </TableHeader>
          <TableBody
            emptyContent={
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center py-12 text-gray-500"
              >
                <Database className="mb-4 h-12 w-12 opacity-30" />
                <p className="mb-2 text-lg font-medium">No Data Found</p>
                <p className="text-sm">{emptyContent}</p>
              </motion.div>
            }
            items={sortedData}
            isLoading={isLoading}
            loadingContent={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex h-full w-full items-center justify-center bg-white/80 py-12 backdrop-blur-sm"
              >
                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Spinner size="lg" color="primary" />
                  </motion.div>
                  <p className="font-medium text-gray-600">Loading data...</p>
                </div>
              </motion.div>
            }
          >
            {(item) => (
              <TableRow
                key={item.id as Key}
                className={cn(
                  "group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50",
                  "cursor-pointer transition-all duration-200",
                  "border-b border-gray-100 last:border-b-0",
                  "hover:shadow-sm",
                )}
              >
                {(columnKey) => (
                  <TableCell
                    className={cn(
                      "px-6 py-4 text-gray-700",
                      "transition-colors duration-200 group-hover:text-gray-900",
                      "first:rounded-l-lg last:rounded-r-lg",
                    )}
                  >
                    <motion.div
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {columnKey === "no" ? (
                        <div className="flex items-center justify-center">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-xs font-bold text-blue-700">
                            {(Number(currentPage) - 1) * Number(currentLimit) +
                              sortedData.indexOf(item) +
                              1}
                          </span>
                        </div>
                      ) : (
                        renderCell(item, columnKey)
                      )}
                    </motion.div>
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </motion.div>
  );
};

export default DataTable;
