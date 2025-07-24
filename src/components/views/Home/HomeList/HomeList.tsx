import { IEventHome } from "@/types/Event";
import { Button, Skeleton } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ItemCard from "./ItemCard";
import { cn } from "@/utils/cn";
import Link from "next/link";
import Image from "next/image";

type Props = {
  events: IEventHome[];
  isLoadingEvent: boolean;
  explore?: boolean;
  totalSkeleton?: number;
};

const HomeList = ({
  events,
  isLoadingEvent,
  explore = false,
  totalSkeleton = 3,
}: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration issue
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <section
      className={cn("bg-gray-50", {
        "py-16": !explore,
      })}
    >
      <div className="container mx-auto px-4">
        {!explore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
              Event Populer
            </h2>
            <p className="text-lg text-gray-600">
              Event terpopuler yang tidak boleh kamu lewatkan
            </p>
          </motion.div>
        )}

        {isMounted && isLoadingEvent ? (
          // Show skeleton when loading
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: totalSkeleton }).map((_, index) => (
              <ItemCard
                key={`skeleton-${index}`}
                index={index}
                isLoading={true}
              />
            ))}
          </div>
        ) : (
          // Show actual data when loaded
          events?.length > 0 && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {events?.map((event, index) => (
                <ItemCard key={event.id} event={event} index={index} />
              ))}
            </div>
          )
        )}

        {isMounted && events?.length < 1 && !isLoadingEvent && (
          <div className="flex h-full min-h-screen flex-col items-center justify-center gap-4 py-20">
            <Image
              src={"/images/illustration/no-data.svg"}
              alt="image not found"
              width={200}
              height={200}
              className="rounded-none"
            />
            <h2 className="text-center text-2xl font-bold text-danger">
              Event is empty
            </h2>
          </div>
        )}

        {isMounted && !explore && (
          <div className="mt-12 text-center">
            {isLoadingEvent ? (
              <>
                <Skeleton className="mx-auto h-12 w-40 rounded-lg" />
              </>
            ) : (
              <Button
                href="/event"
                as={Link}
                size="lg"
                color="primary"
                variant="bordered"
                className="font-semibold"
                endContent={<ArrowRight className="h-4 w-4" />}
              >
                Lihat Semua Event
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeList;
