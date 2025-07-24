import React, { ChangeEvent } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  Chip,
  Input,
  Listbox,
  ListboxItem,
  Spinner,
} from "@heroui/react";
import { Search } from "lucide-react";
import { IEventHome } from "@/types/Event";
import Image from "next/image";
import HomeInputSearch from "./HomeInputSearch";

type Props = {
  dataEventSearch: IEventHome[];
  isLoadingEventSearch: boolean;
  isRefetchingEventSearch: boolean;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  search: string;
  setSearch: (e: string) => void;
  handleFastFilterIsOnline: (value: string, url: string) => void;
  fastFilter: {
    label: string;
    icon: string;
    filter: string;
  }[];
};

const HomeEventSearch = ({
  dataEventSearch,
  isLoadingEventSearch,
  isRefetchingEventSearch,
  handleSearch,
  search,
  setSearch,
  handleFastFilterIsOnline,
  fastFilter,
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mx-auto w-full max-w-6xl"
    >
      <Card className="border border-white/20 bg-white/95 shadow-2xl backdrop-blur-sm">
        <CardBody className="overflow-hidden p-8">
          {/* Search Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6 text-center"
          >
            <h3 className="mb-2 text-2xl font-bold text-gray-800">
              Cari Event Favoritmu
            </h3>
            <p className="text-gray-600">
              Temukan event yang sesuai dengan minat dan lokasimu
            </p>
          </motion.div>

          {/* Horizontal Search Form */}
          <HomeInputSearch
            dataEventSearch={dataEventSearch}
            isLoadingEventSearch={isLoadingEventSearch}
            isRefetchingEventSearch={isRefetchingEventSearch}
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
          />
          {/* Quick Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-6 border-t border-gray-200 pt-6"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-gray-600">
                Filter Cepat:
              </span>
              {fastFilter?.map((filter, index) => (
                <motion.div
                  key={filter.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Chip
                    onClick={() =>
                      handleFastFilterIsOnline(filter.filter, "/event")
                    }
                    variant="flat"
                    className="cursor-pointer transition-colors hover:bg-blue-100"
                    startContent={
                      <span className="text-xs">{filter.icon}</span>
                    }
                  >
                    {filter.label}
                  </Chip>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default HomeEventSearch;
