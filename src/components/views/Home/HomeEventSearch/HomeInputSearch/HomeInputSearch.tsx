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
import { Search, User2 } from "lucide-react";
import { IEventHome } from "@/types/Event";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";

type Props = {
  dataEventSearch: IEventHome[];
  isLoadingEventSearch: boolean;
  isRefetchingEventSearch: boolean;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  search: string;
  setSearch: (e: string) => void;
};

const HomeInputSearch = ({
  dataEventSearch,
  isLoadingEventSearch,
  isRefetchingEventSearch,
  handleSearch,
  search,
  setSearch,
}: Props) => {
  return (
    <>
      <div className="relative flex flex-col items-stretch gap-4 lg:flex-row">
        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex-1"
        >
          <Input
            placeholder="Cari nama event, artis, atau penyelenggara..."
            onChange={(e) => handleSearch(e)}
            onClear={() => setSearch("")}
            startContent={<Search className="h-5 w-5 text-gray-400" />}
            size="lg"
            classNames={{
              input: "text-gray-700 text-base",
              inputWrapper:
                "bg-gray-50 border-gray-200 hover:border-blue-300 focus-within:border-blue-500 transition-colors h-14",
            }}
          />
        </motion.div>
      </div>
      {search !== "" && (
        <Listbox className="mt-3 rounded-xl bg-white" items={dataEventSearch}>
          {!isRefetchingEventSearch && !isLoadingEventSearch ? (
            (item: IEventHome) => (
              <ListboxItem
                key={item.id}
                href={`/event/${item.slug}`}
                className="cursor-pointer border"
              >
                <div className="flex flex-col items-start justify-between lg:flex-row lg:items-center">
                  <div className="flex flex-wrap items-center gap-3">
                    <Image
                      alt={`${item.name}`}
                      src={`${item.banner}`}
                      width={100}
                      height={50}
                      className="h-12 w-20 rounded-lg object-cover"
                    />
                    <div className="flex flex-col items-start justify-center">
                      <div className="flex items-center">
                        <Chip
                          color="primary"
                          variant="solid"
                          size="sm"
                          className="mr-2"
                        >
                          {item?.category?.name}
                        </Chip>
                        <div className="flex items-center">
                          <User2 className="mr-1 h-4 w-4" />
                          <p className="text-sm font-semibold text-gray-700">
                            150 Peserta
                          </p>
                        </div>
                      </div>
                      <p className="line-clamp-2 flex-1 text-wrap text-sm font-bold text-gray-700">
                        {item.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-end space-x-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-500">
                        Mulai dari
                      </p>
                      <p className="text-sm font-bold text-gray-700">
                        {convertIDR(
                          item?.cheapestTicket?.price
                            ? item?.cheapestTicket?.price
                            : 0,
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </ListboxItem>
            )
          ) : (
            <ListboxItem key={"loading-item"}>
              <div className="flex justify-center py-2">
                <Spinner color="primary" size="sm" />
              </div>
            </ListboxItem>
          )}
        </Listbox>
      )}
    </>
  );
};

export default HomeInputSearch;
