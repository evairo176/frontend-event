import { cn } from "@/utils/cn";
import { p } from "framer-motion/client";
import { File } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useId, useRef, useState } from "react";

type Props = {
  name: string;
  className?: string;
  isDroppable?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isInvalid?: boolean;
  errorMessage?: string;
};

const InputFile = ({
  name,
  className,
  isDroppable = false,
  onChange,
  isInvalid,
  errorMessage,
}: Props) => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const drop = useRef<HTMLLabelElement>(null);
  const dropzoneId = useId();

  const handleDragOver = (e: DragEvent) => {
    if (isDroppable) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setUploadedImage(e.dataTransfer?.files[0] || null);
  };

  useEffect(() => {
    const dropCurrent = drop.current;

    if (dropCurrent) {
      dropCurrent.addEventListener("dragover", handleDragOver);
      dropCurrent.addEventListener("drop", handleDrop);

      return () => {
        dropCurrent.removeEventListener("dragover", handleDragOver);
        dropCurrent.removeEventListener("drop", handleDrop);
      };
    }
  }, [drop, handleDragOver, handleDrop]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;

    if (files && files?.length > 0) {
      setUploadedImage(files[0]);

      if (onChange) {
        onChange(e);
      }
    }
  };

  return (
    <div>
      <label
        ref={drop}
        htmlFor={`dropzone-file-${dropzoneId}`}
        className={cn(
          "flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-all delay-100 hover:bg-gray-100",
          className,
          {
            "border-danger-500": isInvalid,
          },
        )}
      >
        {uploadedImage ? (
          <div className="flex flex-col items-center justify-center p-5">
            <div className="mb-2 w-1/2">
              <Image
                fill
                src={URL.createObjectURL(uploadedImage)}
                alt="image"
                className="!relative"
              />
            </div>
            <p className="text-center text-sm font-semibold text-gray-500">
              {uploadedImage.name}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-5">
            <File className="mb-2 h-10 w-10 text-gray-400" />
            <p className="text-center text-sm font-semibold text-gray-500">
              {isDroppable
                ? "Drag & drop or click to upload file here"
                : "Click to upload file here"}
            </p>
          </div>
        )}
        <input
          type="file"
          name={name}
          className="hidden"
          accept="image/*"
          id={`dropzone-file-${dropzoneId}`}
          onChange={handleChange}
        />
      </label>
      {isInvalid && (
        <p className="p-1 text-xs text-danger-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputFile;
