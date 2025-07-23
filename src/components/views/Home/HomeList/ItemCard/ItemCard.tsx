import { IEventHome } from "@/types/Event";
import { Button, Card, CardBody, Chip, Divider, Skeleton } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import { formatDateTime } from "@/utils/date";

type Props = {
  event?: IEventHome;
  index: number;
  isLoading?: boolean;
};

const ItemCardSkeleton = ({ index }: { index: number }) => {
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration issue
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted && (
        <div className="animate-pulse">
          <Card className="overflow-hidden">
            <div className="relative h-48">
              <Skeleton className="h-full w-full rounded-none" />
              <div className="absolute left-4 top-4">
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
            <CardBody className="p-6">
              <Skeleton className="mb-2 h-6 w-3/4 rounded-lg" />
              <Skeleton className="mb-4 h-4 w-1/2 rounded-lg" />

              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-24 rounded" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-32 rounded" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-20 rounded" />
                </div>
              </div>

              <Divider className="my-4" />

              <div className="flex items-center justify-between">
                <div>
                  <Skeleton className="mb-1 h-3 w-16 rounded" />
                  <Skeleton className="h-6 w-24 rounded" />
                </div>
                <Skeleton className="h-10 w-28 rounded-lg" />
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
};

const ItemCard = ({ event, index, isLoading = false }: Props) => {
  if (isLoading) {
    return <ItemCardSkeleton index={index} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="relative h-48">
          <Image
            src={event?.banner as string}
            className="h-full w-full object-cover"
            alt={event?.name as string}
            width={200}
            height={200}
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute left-4 top-4">
            <Chip color="primary" variant="solid" size="sm">
              {event?.category?.name}
            </Chip>
          </div>
        </div>
        <CardBody className="p-6">
          <h3 className="line-clamp-2 text-xl font-bold text-gray-800">
            {event?.name}
          </h3>
          <p className="mb-2 line-clamp-2 text-sm text-gray-500">
            {event?.description}
          </p>
          <div className="mb-4 space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{event?.city.name}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">
                {formatDateTime(event?.startDate)} -{" "}
                {formatDateTime(event?.endDate)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="h-4 w-4" />
              <span className="text-sm">{event?.totalAudience} peserta</span>
            </div>
          </div>
          <Divider className="my-4" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Mulai dari</p>
              <p className="text-xl font-bold text-blue-600">
                {convertIDR(
                  event?.cheapestTicket?.price
                    ? event?.cheapestTicket?.price
                    : 0,
                )}
              </p>
            </div>
            <Button
              color="primary"
              variant="flat"
              endContent={<ArrowRight className="h-4 w-4" />}
            >
              Lihat Detail
            </Button>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default ItemCard;
