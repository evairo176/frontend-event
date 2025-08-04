import { Button, Switch } from "@heroui/react";
import { on } from "events";
import { Activity, Eye, Trash } from "lucide-react";
import React from "react";

type Props = {
  onPressButtonActivate?: () => void;
  currentValue: boolean;
};

const SwitchAction = ({ onPressButtonActivate, currentValue }: Props) => {
  return (
    <div className="flex items-center gap-3">
      {onPressButtonActivate && (
        <Switch
          size="md"
          isSelected={currentValue}
          onValueChange={onPressButtonActivate}
          aria-label={`Switch to ${currentValue ? "activate" : "deactivate"}`}
          color={currentValue ? "success" : "default"}
        />
      )}
    </div>
  );
};

export default SwitchAction;
