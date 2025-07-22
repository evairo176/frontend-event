import { IEventHome } from "@/types/Event";
import { Button, Skeleton } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ItemCard from "./ItemCard";

type Props = {
  events: IEventHome[];
  isLoadingEvent: boolean;
};

const HomeList = ({ events, isLoadingEvent }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration issue
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoadingEvent
            ? // Show skeleton when loading
              Array.from({ length: 3 }).map((_, index) => (
                <ItemCard
                  key={`skeleton-${index}`}
                  index={index}
                  isLoading={true}
                />
              ))
            : // Show actual data when loaded
              events &&
              events?.map((event, index) => (
                <ItemCard key={event.id} event={event} index={index} />
              ))}
        </div>

        <div className="mt-12 text-center">
          {isLoadingEvent && isMounted ? (
            <>
              <Skeleton className="mx-auto h-12 w-40 rounded-lg" />
            </>
          ) : (
            <Button
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
      </div>
    </section>
  );
};

export default HomeList;
