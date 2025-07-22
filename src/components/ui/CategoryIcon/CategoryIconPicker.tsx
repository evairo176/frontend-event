import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Search, ChevronDown } from "lucide-react";
import { CATEGORY_ICONS, getAvailableIcons } from "./CategoryIcon";
import { cn } from "@/utils/cn";

export interface CategoryIconPickerProps {
  /**
   * Currently selected icon key
   */
  value?: string;
  /**
   * Callback when icon is selected
   */
  onChange?: (iconKey: string) => void;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Whether the picker is disabled
   */
  disabled?: boolean;
  /**
   * Size of the icons in the picker
   */
  iconSize?: "sm" | "md" | "lg";
  /**
   * Custom className
   */
  className?: string;
  /**
   * Label for the form field
   */
  label?: string;
  /**
   * Error message
   */
  error?: string;
}

const CategoryIconPicker: React.FC<CategoryIconPickerProps> = ({
  value,
  onChange,
  placeholder = "Pilih icon kategori",
  disabled = false,
  iconSize = "md",
  className,
  label,
  error,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");

  const availableIcons = getAvailableIcons();

  // Filter icons based on search query
  const filteredIcons = availableIcons.filter((iconKey) =>
    iconKey.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Get the selected icon component
  const SelectedIconComponent = value ? CATEGORY_ICONS[value] : null;

  // Icon size classes
  const iconSizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const handleIconSelect = (iconKey: string) => {
    onChange?.(iconKey);
    onClose();
  };

  // Format icon key for display (capitalize first letter)
  const formatIconLabel = (iconKey: string) => {
    return iconKey.charAt(0).toUpperCase() + iconKey.slice(1);
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <Button
        variant="bordered"
        className={cn(
          "h-12 w-full justify-between px-3",
          error && "border-red-500",
          disabled && "cursor-not-allowed opacity-50",
        )}
        onClick={onOpen}
        disabled={disabled}
        endContent={<ChevronDown className="h-4 w-4 text-gray-400" />}
      >
        <div className="flex items-center gap-2">
          {SelectedIconComponent ? (
            <>
              <SelectedIconComponent
                className={cn(iconSizeClasses[iconSize], "text-gray-600")}
              />
              <span className="text-gray-700">{formatIconLabel(value!)}</span>
            </>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
      </Button>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

      {/* Icon Picker Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h3>Pilih Icon Kategori</h3>
            <Input
              placeholder="Cari icon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startContent={<Search className="h-4 w-4 text-gray-400" />}
              className="mt-2"
            />
          </ModalHeader>
          <ModalBody className="pb-6">
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
              {filteredIcons.map((iconKey) => {
                const IconComponent = CATEGORY_ICONS[iconKey];
                const isSelected = value === iconKey;

                return (
                  <Card
                    key={iconKey}
                    isPressable
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:scale-105",
                      isSelected && "bg-blue-50 ring-2 ring-blue-500",
                    )}
                    onClick={() => handleIconSelect(iconKey)}
                  >
                    <CardBody className="flex flex-col items-center justify-center p-3">
                      <IconComponent
                        className={cn(
                          "mb-1 h-6 w-6",
                          isSelected ? "text-blue-600" : "text-gray-600",
                        )}
                      />
                      <span
                        className={cn(
                          "text-center text-xs leading-tight",
                          isSelected
                            ? "font-medium text-blue-600"
                            : "text-gray-500",
                        )}
                      >
                        {formatIconLabel(iconKey)}
                      </span>
                    </CardBody>
                  </Card>
                );
              })}
            </div>

            {filteredIcons.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <Search className="mb-2 h-12 w-12 opacity-50" />
                <p>Tidak ada icon yang ditemukan</p>
                <p className="text-sm">Coba kata kunci lain</p>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CategoryIconPicker;
