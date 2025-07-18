import { IEventHome } from "@/types/Event";
import { Button, Card, CardBody, Chip, Divider } from "@heroui/react";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";

type Props = {
  event: IEventHome;
  index: number;
};

const ItemCard = ({ event, index }: Props) => {
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
            src={event.banner as string}
            className="h-full w-full object-cover"
            alt={event.name}
            width={200}
            height={200}
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute left-4 top-4">
            <Chip color="primary" variant="solid" size="sm">
              {event.category.name}
            </Chip>
          </div>
        </div>
        <CardBody className="p-6">
          <h3 className="mb-2 line-clamp-2 text-xl font-bold text-gray-800">
            {event.name}
          </h3>
          <div className="mb-4 space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{event.city.name}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">
                {event.startDate} - {event.endDate}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="h-4 w-4" />
              <span className="text-sm">{event.totalAudience} peserta</span>
            </div>
          </div>
          <Divider className="my-4" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Mulai dari</p>
              <p className="text-xl font-bold text-blue-600">
                {convertIDR(
                  event.cheapestTicket?.price ? event.cheapestTicket?.price : 0,
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
