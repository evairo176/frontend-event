import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  Chip,
  Pagination,
  Select,
  SelectItem,
} from "@heroui/react";
import useChangeUrl from "@/hooks/useChangeUrl";
import { LIMIT_LIST } from "@/components/constants/list.constants";
type Props = {
  total: number;
  totalPages: number;
  currentTotal: number;
};

const EventFooter = ({ total, totalPages, currentTotal }: Props) => {
  const {
    currentLimit,
    currentCategory,
    handleChangeLimit,
    currentPage,
    handleChangePage,
  } = useChangeUrl();

  const bottomContent = useMemo(() => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="container mx-auto mb-3 mt-4 px-4"
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
                      <p className="text-small font-medium">
                        Show: {currentLimit}
                      </p>
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
                      {currentTotal}
                    </Chip>
                    <span className="text-sm text-gray-500">of</span>
                    <Chip
                      variant="flat"
                      size="sm"
                      className="bg-purple-50 text-purple-700"
                    >
                      {total || 0}
                    </Chip>
                    <span className="text-sm text-gray-500">records</span>
                  </div>
                </div>
              </div>

              {/* Right Section - Pagination */}
              {totalPages > 1 && (
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
    currentCategory,
    currentPage,
    totalPages,
    handleChangePage,
    handleChangeLimit,
    total,
    currentTotal,
  ]);
  return bottomContent;
};

export default EventFooter;
