import { ICategory } from "@/types/Category";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Textarea,
} from "@heroui/react";
import React from "react";

type Props = {
  dataCategory: ICategory;
};

const InfoTab = ({ dataCategory }: Props) => {
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Information </h1>
        <p className="w-full text-small text-default-500">
          Manage information of this category
        </p>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={() => {}}>
          <Skeleton className="rounded-md" isLoaded={!!dataCategory?.name}>
            <Input
              variant="flat"
              label="Name"
              type="text"
              defaultValue={dataCategory?.name}
            />
          </Skeleton>
          <Skeleton
            className="rounded-md"
            isLoaded={!!dataCategory?.description}
          >
            <Textarea
              variant="flat"
              label="Description"
              defaultValue={dataCategory?.description}
            />
          </Skeleton>

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

export default InfoTab;
