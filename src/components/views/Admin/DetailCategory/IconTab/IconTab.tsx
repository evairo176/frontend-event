import InputFile from "@/components/ui/InputFile";
import { Button, Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";

import React from "react";

type Props = {
  currentIcon: string;
};

const IconTab = ({ currentIcon }: Props) => {
  const { back } = useRouter();
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Category Icon</h1>
          <p className="text-small text-default-500">
            Manage icon of this category
          </p>
        </div>
        <Button color="danger" onPress={() => back()}>
          <ArrowLeft className="h-4 w-4 text-white" />
          Back
        </Button>
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
