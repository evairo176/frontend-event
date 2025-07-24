"use client";
import { ICategory } from "@/types/Category";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import useEventFilter from "./useEventFilter";
import useChangeUrl from "@/hooks/useChangeUrl";
import Image from "next/image";

type Props = {};

const EventFilter = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration issue
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const {
    control,
    setValue,
    dataCategory,
    isLoadingCategory,
    isSuccessCategory,
    reset,
  } = useEventFilter();
  const {
    handleChangeCategory,
    handleChangeIsFeatured,
    handleChangeIsOnline,
    currentCategory,
    currentIsFeatured,
    currentIsOnline,
    resetFilterExplore,
  } = useChangeUrl();

  useEffect(() => {
    setValue("categoryId", `${currentCategory}`);

    setValue("isFeatured", `${currentIsFeatured ? "true" : "false"}`);

    setValue("isOnline", `${currentIsOnline ? "true" : "false"}`);
  }, [isSuccessCategory]);

  return (
    <div className="h-fit w-full rounded-xl border p-4 lg:sticky lg:top-20 lg:w-80">
      <h4 className="text-xl font-semibold">Filter</h4>
      <div className="mt-4 flex flex-col gap-4">
        <Skeleton className="rounded-md" isLoaded={!isLoadingCategory}>
          <Controller
            name="categoryId"
            control={control}
            render={({ field: { onChange, ...field } }) => {
              return (
                <Autocomplete
                  {...field}
                  defaultItems={dataCategory?.data?.data || []}
                  label="Category"
                  placeholder="Search Category here"
                  variant="underlined"
                  onSelectionChange={(value) => {
                    onChange(value);
                    handleChangeCategory(value as string);
                  }}
                  allowsEmptyCollection
                  selectedKey={currentCategory as string}
                >
                  {(category: ICategory) => {
                    return (
                      <AutocompleteItem
                        key={`${category.id}`}
                        startContent={
                          <Image
                            src={`${category?.icon}`}
                            width={20}
                            height={20}
                            alt={`${category.name}`}
                            className="mr-3 h-[20] w-[20] object-cover"
                          />
                        }
                      >
                        {category.name}
                      </AutocompleteItem>
                    );
                  }}
                </Autocomplete>
              );
            }}
          />
        </Skeleton>
        <Skeleton className="rounded-md" isLoaded={!isLoadingCategory}>
          <Controller
            name="isFeatured"
            control={control}
            render={({ field: { onChange, ...field } }) => {
              return (
                <Select
                  {...field}
                  label="Featured"
                  variant="underlined"
                  defaultSelectedKeys={[currentIsFeatured as string]}
                  onChange={(e) => {
                    onChange(e.target.value);
                    handleChangeIsFeatured(e.target.value);
                  }}
                  selectedKeys={[currentIsFeatured as string]}
                >
                  <SelectItem key={"true"} textValue="Yes">
                    Yes
                  </SelectItem>
                  <SelectItem key={"false"} textValue="No">
                    No
                  </SelectItem>
                </Select>
              );
            }}
          />
        </Skeleton>

        <Skeleton className="rounded-md" isLoaded={!isLoadingCategory}>
          <Controller
            name="isOnline"
            control={control}
            render={({ field: { onChange, ...field } }) => {
              return (
                <Select
                  {...field}
                  label="Online/Offline"
                  variant="underlined"
                  defaultSelectedKeys={[currentIsOnline as string]}
                  onChange={(e) => {
                    onChange(e.target.value);
                    handleChangeIsOnline(e.target.value);
                  }}
                  selectedKeys={[currentIsOnline as string]}
                >
                  <SelectItem key={"true"} textValue="Online">
                    Online
                  </SelectItem>
                  <SelectItem key={"false"} textValue="Offline">
                    Offline
                  </SelectItem>
                </Select>
              );
            }}
          />
        </Skeleton>
        {isMounted && (
          <Button
            onPress={() => {
              resetFilterExplore();
              reset();
            }}
            disabled={isLoadingCategory}
          >
            {isLoadingCategory && <Spinner size="sm" color="white" />} Reset
            Filter
          </Button>
        )}
      </div>
    </div>
  );
};

export default EventFilter;
