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
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  dataCategory: ICategory;
};

const InfoTab = ({ dataCategory }: Props) => {
  const { back } = useRouter();
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Category Information</h1>
          <p className="text-small text-default-500">
            Manage information of this category
          </p>
        </div>
        <Button color="danger" onPress={() => back()}>
          <ArrowLeft className="h-4 w-4 text-white" />
          Back
        </Button>
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
