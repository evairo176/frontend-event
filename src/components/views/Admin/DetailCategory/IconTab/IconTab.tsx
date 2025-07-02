import InputFile from "@/components/ui/InputFile";
import { Button, Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import Image from "next/image";

import React from "react";

type Props = {
  currentIcon: string;
};

const IconTab = ({ currentIcon }: Props) => {
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Icon</h1>
        <p className="w-full text-small text-default-500">
          Manage icon of this category
        </p>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={() => {}}>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">Current icon</p>
            <Skeleton
              isLoaded={!!currentIcon}
              className="aspect-square rounded-lg"
            >
              <Image src={currentIcon} alt="icon" fill className="!relative" />
            </Skeleton>
          </div>
          <InputFile name="icon" isDroppable label="Upload new icon" />
          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
          >
            Save Changes
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default IconTab;
