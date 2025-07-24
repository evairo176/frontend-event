import HomeInputSearch from "@/components/views/Home/HomeEventSearch/HomeInputSearch";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import React from "react";
import useNavbarModalSearch from "./useNavbarModalSearch";
import { Search } from "lucide-react";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onOpenChange: () => void;
};

const NavbarModalSearch = ({ isOpen, onClose, onOpenChange }: Props) => {
  const {
    dataEventSearch,
    isLoadingEventSearch,
    isRefetchingEventSearch,
    handleSearch,
    search,
    setSearch,
  } = useNavbarModalSearch();
  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => {
        setSearch("");
        onClose();
      }}
      size="3xl"
    >
      <ModalContent>
        <ModalHeader className="flex w-full items-center justify-center">
          <Search className="h-7 w-7 animate-bounce" />
          <span>Cari Event</span>
        </ModalHeader>
        <ModalBody>
          <HomeInputSearch
            dataEventSearch={dataEventSearch?.data || []}
            isLoadingEventSearch={isLoadingEventSearch}
            isRefetchingEventSearch={isRefetchingEventSearch}
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={onClose}
            disabled={isLoadingEventSearch || isRefetchingEventSearch}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NavbarModalSearch;
