import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { ChevronDown } from "lucide-react";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { cn } from "@/utils/cn";

export interface EmojiCategoryPickerProps {
  /**
   * Currently selected emoji
   */
  value?: string;
  /**
   * Callback when emoji is selected
   */
  onChange?: (emoji: string) => void;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Whether the picker is disabled
   */
  disabled?: boolean;
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
  /**
   * Size of the emoji display
   */
  emojiSize?: "sm" | "md" | "lg";
}

const EmojiCategoryPicker: React.FC<EmojiCategoryPickerProps> = ({
  value,
  onChange,
  placeholder = "Pilih emoji kategori",
  disabled = false,
  className,
  label,
  error,
  emojiSize = "md",
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Emoji size classes
  const emojiSizeClasses = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
  };

  const handleEmojiSelect = (emojiData: EmojiClickData) => {
    onChange?.(emojiData.emoji);
    onClose();
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
          {value ? (
            <>
              <span className={cn(emojiSizeClasses[emojiSize])}>{value}</span>
              <span className="text-gray-700">Emoji dipilih</span>
            </>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
      </Button>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

      {/* Emoji Picker Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h3>Pilih Emoji Kategori</h3>
            <p className="text-sm text-gray-500">Klik emoji untuk memilih</p>
          </ModalHeader>
          <ModalBody className="pb-6">
            <div className="flex justify-center">
              <EmojiPicker
                onEmojiClick={handleEmojiSelect}
                theme={Theme.LIGHT}
                width={400}
                height={400}
                searchDisabled={false}
                skinTonesDisabled={true}
                previewConfig={{
                  showPreview: false,
                }}
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EmojiCategoryPicker;
