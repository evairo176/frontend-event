import { Button } from "@heroui/react";
import { on } from "events";
import { Eye, Trash } from "lucide-react";
import React from "react";

type Props = {
  onPressButtonDetail?: () => void;
  onPressButtonDelete?: () => void;
};

const ButtonAction = ({ onPressButtonDetail, onPressButtonDelete }: Props) => {
  return (
    <div className="flex items-center gap-3">
      {onPressButtonDetail && (
        <Button
          isIconOnly
          size="sm"
          variant="light"
          onPress={onPressButtonDetail}
          className="bg-primary-100"
        >
          <Eye className="h-5 w-5 text-primary-500" />
        </Button>
      )}

      {onPressButtonDelete && (
        <Button
          isIconOnly
          size="sm"
          variant="light"
          onPress={onPressButtonDelete}
          className="bg-danger-100"
        >
          <Trash className="h-5 w-5 text-danger-500" />
        </Button>
      )}
    </div>
  );
};

export default ButtonAction;
